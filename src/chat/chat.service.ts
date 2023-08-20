import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Server, Socket } from 'socket.io';
import { RoomService } from 'src/room/room.service';
import { VisitorService } from 'src/visitor/visitor.service';
import { Chat } from './entities/chat.entity';
import { Model } from 'mongoose';
import { ChatMessage } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
    constructor(private readonly roomService: RoomService,
        private readonly visitorService: VisitorService,
        @InjectModel(Chat.name) private chatModel: Model<Chat>) { }


    private async saveMessage(chatPayload: ChatMessage) {
        await this.chatModel.create(chatPayload)
    }

    private async deleteChat(room:string) {
        await this.chatModel.deleteMany({
            room:room
        })
    }
    async handleConnection(io: Server, socket: Socket) {
        console.log(`Client Connected: ${socket.id}`);
        //if it has token, it means its a customer representative
        if (socket.handshake.query.token) {
            //join room
            let visitors = await this.visitorService.getVisitors()
            io.emit('available-users', { visitors })
        } else {
            //boradcast this to the CR sockets
            console.log('in else')
            await this.visitorService.addVisitor(socket.id)
            io.emit('new-user', { client: socket.id })
        }
    }

    async acceptUser(io: Server, socket: Socket, data: { client: string }): Promise<void> {
        await this.roomService.create({ name: `${socket.id}_${data.client}`, visitorId: data.client, representativeId: socket.id })
        await this.visitorService.updateVisitor(data.client, false)
        socket.join(`${socket.id}_${data.client}`)
        io.emit('available-users', { visitors: await this.roomService.getVisitors() })
        socket.to(data.client).emit('join-room-request', { representative: socket.id, room: `${socket.id}_${data.client}` })
        socket.emit('join-room-request', { room: `${socket.id}_${data.client}` })
    }

    joinRoom(socket: Socket, room: string) {
        socket.join(room)
    }

    async sendMessage(socket: Socket, data: { to: string, message: string }) {
        await this.saveMessage({
            message: data.message,
            from: socket.id,
            room: data.to
        })
        socket.to(data.to).emit("message", { message: data.message })
    }

    async getRooms(socket: Socket) {
        let rooms = await this.roomService.findAll(socket.id)
        socket.to(socket.id).emit('rooms', { rooms })
    }

    async endCall(socket: Socket, data) {
        await this.deleteChat(data.room);
        socket.to(data.visitorId).emit('chat-ended',{})
    }

    leaveRoom(socket: Socket, data) {
        socket.leave(data.room.name)
    }
    async handleDisconnect(io: Server, socket: Socket) {
        console.log(`socket Disconnected: ${socket.id}`);
        if (socket.handshake.query.token) {
            //join room
            let visitors = await this.visitorService.updateVisitors(socket.id)
            io.emit('available-users', { visitors })
            console.log(socket.rooms, 'all the rooms in CR')
        } else {
            //boradcast this to the CR sockets
            let room = await this.visitorService.removeVisitor(socket.id)
            io.to(room?.representativeId).emit("leave-room-request", { room })
            console.log(socket.rooms, 'all the rooms in user')

        }
    }
}