import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { RoomService } from 'src/room/room.service';
import { VisitorService } from 'src/visitor/visitor.service';

@Injectable()
export class ChatService {
    constructor(private readonly roomService: RoomService,
        private readonly visitorService: VisitorService) { }

    async handleConnection(io:Server,socket: Socket) {
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
   
    async acceptUser(io:Server,socket:Socket, data:{client:string}): Promise<void> {
        await this.roomService.create({ name: `${socket.id}_${data.client}`, visitorId: data.client, representativeId: socket.id })
        await this.visitorService.updateVisitor(data.client, false)
        socket.join(`${socket.id}_${data.client}`)
        io.emit('available-users', { visitors: await this.roomService.getVisitors() })
        socket.to(data.client).emit('join-room-request', { representative: socket.id, room: `${socket.id}_${data.client}` })
        socket.emit('join-room-request', { room: `${socket.id}_${data.client}` })
    }

    joinRoom(socket:Socket, room:string) {
        socket.join(room)
    }

    sendMessage(socket:Socket, data:{to:string,message:string}) {
        socket.to(data.to).emit("message", { message: data.message })
    }
    
    leaveRoom(socket, data) {
        socket.leave(data.room.name)
    }

    async getRooms(socket:Socket) {
        let rooms = await this.roomService.findAll(socket.id)
        socket.to(socket.id).emit('rooms', { rooms })
    }

    async handleDisconnect(io:Server,socket: Socket) {
        console.log(`socket Disconnected: ${socket.id}`);
        if (socket.handshake.query.token) {
            //join room
            let visitors = await this.visitorService.updateVisitors(socket.id)
            io.emit('available-users', { visitors })
        } else {
            //boradcast this to the CR sockets
            let room = await this.visitorService.removeVisitor(socket.id)
            io.to(room?.representativeId).emit("leave-room-request", { room })

        }
    }
}