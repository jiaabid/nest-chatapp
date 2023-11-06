import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import {
    OnGatewayConnection,
    OnGatewayInit,
    OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { AcceptUserDto } from './dto/accept-user.dto';
import { EndCallDto } from './dto/end-call.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { RepresentativeDto } from './dto/representative.dto';
import { RoomDto } from './dto/room.dto';
import { VisitorDto } from './dto/visitor.dto';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) { }

    @WebSocketServer() wss;

    afterInit(server: Server) {
        console.log(server, 'this is sercwe');
    }

    async handleDisconnect(socket: Socket) {
        this.chatService.handleDisconnect(this.wss, socket);
    }

    async handleConnection(socket: Socket, ...args: any[]) {
        this.chatService.handleConnection(this.wss, socket);
    }

    //when CR accept the user request, send to join-room request to the user interface
    @SubscribeMessage('accept-user')
    async acceptUser(socket: Socket, data: AcceptUserDto): Promise<void> {
        this.chatService.acceptUser(this.wss, socket, data);
    }

    //user interface on receiving the join room request, emits the join-room event
    @SubscribeMessage('connect-visitor')
    connectVisitor(socket: Socket, data: VisitorDto) {
        this.chatService.connectVisitor(this.wss, socket, data);
    }

    //user interface on receiving the join room request, emits the join-room event
    @SubscribeMessage('join-room')
    joinRoom(socket: Socket, data: RoomDto) {
        this.chatService.joinRoom(socket, data);
    }

     //user interface on receiving the join room request, emits the join-room event
     @SubscribeMessage('update-visitor')
     updateVisitor(socket: Socket, data: VisitorDto) {
         this.chatService.updateVisitor(socket, data);
     }
    //send message to the room
    @SubscribeMessage('send-message')
    sendMessage(socket: Socket, data:SendMessageDto) {
        this.chatService.sendMessage(socket, data);
    }

    //send message to the room
    @SubscribeMessage('end-call')
    endCall(socket: Socket, data: EndCallDto) {
        this.chatService.endCall(this.wss,socket, data);
    }

    //retrieve all the room
    @SubscribeMessage('get-rooms')
    async getRooms(socket: Socket, data: RepresentativeDto) {
        this.chatService.getRooms(socket, data);
    }

    //retrieve a  room
    @SubscribeMessage('get-room')
    async getRoom(socket: Socket, data: RoomDto) {
        this.chatService.getRoom(socket, data);
    }

    @SubscribeMessage('leave-room')
    leaveRoom(socket: Socket, data) {
        this.chatService.leaveRoom(socket, data);
    }
    @SubscribeMessage('test')
    test(socket: Socket, data) {
        console.log(socket.id,'its a test')
    }
}
