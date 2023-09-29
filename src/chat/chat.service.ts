import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Server, Socket } from 'socket.io';
import { RoomService } from 'src/room/room.service';
import { VisitorService } from 'src/visitor/visitor.service';
import { Chat } from './entities/chat.entity';
import { Model } from 'mongoose';
import { ChatMessage } from './dto/create-chat.dto';
import { DeleteRoomTimer } from './constants/constants';
import { SendMessageDto } from './dto/send-message.dto';
import { RepresentativeDto } from './dto/representative.dto';
import { RoomDto } from './dto/room.dto';
import { AcceptUserDto } from './dto/accept-user.dto';
import { VisitorDto } from './dto/visitor.dto';

@Injectable()
export class ChatService {
    constructor(private readonly roomService: RoomService,
        private readonly visitorService: VisitorService,
        @InjectModel(Chat.name) private chatModel: Model<Chat>) { }

    roomTimer = {}

    private async saveMessage(chatPayload: ChatMessage) {
        await this.chatModel.create(chatPayload)
    }

    private async deleteChat(room: string[]) {
        await this.chatModel.deleteMany({
            room: { $in: room }
        })

    }
    async handleConnection(io: Server, socket: Socket) {
        try {
            console.log(`Client Connected: ${socket.id}`);
            //if it has token, it means its a customer representative
            if (socket.handshake.query.token) {
                let response = await this.visitorService.getVisitors()
                if (!response.success) {
                    throw new Error(response.payload.message)
                }
                io.emit('available-users', { visitors: response.payload })
                //remove the disconnected timmer
                this.roomTimer[`${socket.handshake.query.id}`] && clearTimeout(this.roomTimer[`${socket.handshake.query.id}`]);
            }
        } catch (err) {
            this.handleError(socket, err)
        }

    }
    async connectVisitor(io: Server, socket: Socket, data: VisitorDto) {
        try {
            this.roomTimer[`${socket.handshake.query.id}`] && clearTimeout(this.roomTimer[`${socket.handshake.query.id}`]);
            //boradcast this to the CR sockets
            let response = await this.visitorService.addVisitor(data.visitorId)
            socket.join(data.visitorId)
            if (!response.success) {
                throw new Error(response.payload.message)
            }
            io.emit('new-user', { visitorId: data.visitorId })
        } catch (err) {
            this.handleError(socket, err)
        }


    }

    async acceptUser(io: Server, socket: Socket, data: AcceptUserDto) {

        try {
            let response = await this.roomService.create({ name: `${data.representativeId}_${data.visitorId}`, visitorId: data.visitorId, representativeId: data.representativeId })
            if (!response.success) {
                throw new Error(response.payload.message)
            }
            let visitorResponse = await this.visitorService.updateVisitor(data.visitorId, false)
            if (!visitorResponse.success) {
                this.roomService.remove(response.payload._id) //delete the created room
                throw new Error(visitorResponse.payload.message)
            }

            socket.join(response.payload._id)
            let getVisitorresponse = await this.roomService.getVisitors()
            if (!getVisitorresponse.success) {
                throw new Error(getVisitorresponse.payload.message)
            }
            io.emit('available-users', { visitors: getVisitorresponse.payload }) // broadcast the available user list

            //to visitor
            socket.to(data.visitorId).emit('join-room-request', { representative: data.representativeId, room: response.payload._id.toString() })
            // //to representative
            socket.emit('join-room-request', { room: response.payload._id.toString() })

        } catch (err) {
            return this.handleError(socket, err)
        }

    }



    joinRoom(socket: Socket, room: string) {
        try {
            socket.join(room)
        } catch (err) {
            this.handleError(socket, err)
        }

    }

    async sendMessage(socket: Socket, data: SendMessageDto) {
        try {
            await this.saveMessage({
                message: data.message,
                from: data.from,
                room: data.to
            })
            socket.to(data.to).emit("message", { message: data.message })
        } catch (err) {
            this.handleError(socket, err)
        }

    }

    async getRooms(socket: Socket, data: RepresentativeDto) {
        try {
            let response = await this.roomService.getRooms(data.representativeId)
            if (!response.success) {
                throw new Error(response.payload.message)
            }
            socket.to(data.representativeId).emit('rooms', { rooms: response.payload })
        } catch (err) {
            this.handleError(socket, err)
        }

    }


    async getRoom(socket: Socket, data: RoomDto) {
        try {
            let history = await this.chatModel.find({ room: data.room })
            socket.emit("chat-history", { history })
        } catch (err) {
            this.handleError(socket, err)
        }

    }
    async endCall(socket: Socket, data) {
        try {

            this.roomService.remove(data.room) //delete the created room
            await this.deleteChat([data.room]);
            socket.to(data.visitorId).emit('chat-ended', {})
            //remove rooms also -- pending
        } catch (err) {
            this.handleError(socket, err)
        }
    }

    leaveRoom(socket: Socket, data) {
        try {
            socket.leave(data.roomId)
        } catch (err) {
            this.handleError(socket, err)
        }
    }


    async handleDisconnect(io: Server, socket: Socket) {
        console.log(`socket Disconnected: ${socket.id}`);
        try {
            if (socket.handshake.query.token) {
                try {
                    //join room
                    this.roomTimer[`${socket.handshake.query.id}`] = setTimeout(async () => {
                        let response = await this.visitorService.updateVisitors(`${socket.handshake.query.id}`)
                        if (!response.success) {
                            throw new Error(response.payload.message)
                        }
                        let { visitors, rooms } = response.payload;
                        io.emit('available-users', { visitors })
                        this.deleteChat(rooms.map(room => room?._id.toString()))
                        visitors.forEach((visitor: any) => {
                            io.to(visitor.visitorId).emit('update-room')
                        })
                    }, DeleteRoomTimer)
                } catch (err) {
                    this.handleError(socket, err)

                }

            } else {
                // //boradcast this to the CR sockets
                this.roomTimer[`${socket.handshake.query.id}`] = setTimeout(async () => {
                    try {
                        let response = await this.visitorService.removeVisitor(`${socket.handshake.query.id}`)
                        if (!response.success) {
                            throw new Error(response.payload.message)
                        }
                        const { payload: room } = response
                        io.to(room?.representativeId).emit("leave-room-request", { roomId: room?._id.toString() })

                        let getVisitorresponse = await this.visitorService.getVisitors()
                        if (!getVisitorresponse.success) {
                            throw new Error(getVisitorresponse.payload.message)
                        }
                        io.emit('available-users', { visitors: getVisitorresponse.payload })
                        this.deleteChat([room?._id.toString()])
                    } catch (err) {
                        this.handleError(socket, err)

                    }

                }, DeleteRoomTimer)
            }
        } catch (err) {
            this.handleError(socket, err)
        }
    }

    private handleError(socket: Socket, payload) {
        return socket.emit('error', { message: payload.message })

    }
}