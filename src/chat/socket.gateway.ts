import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from "@nestjs/websockets/interfaces"
import { WebSocketServer } from "@nestjs/websockets/decorators"
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";


@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly chatService: ChatService) { }

    @WebSocketServer() wss;

    afterInit(server: Server) {
        console.log(server, 'this is sercwe')
    }

    async handleDisconnect(socket: Socket) {
        this.chatService.handleDisconnect(this.wss, socket)
    }

    async handleConnection(socket: Socket, ...args: any[]) {
        this.chatService.handleConnection(this.wss, socket)
    }

    //when CR accept the user request, send to join-room request to the user interface
    @SubscribeMessage('accept-user')
    async acceptUser(socket: Socket, data: { client: string }): Promise<void> {
        this.chatService.acceptUser(this.wss, socket, data);
    }

    //user interface on receiving the join room request, emits the join-room event
    @SubscribeMessage('join-room')
    joinRoom(socket: Socket, data: { room: string }) {
        this.chatService.joinRoom(socket, data.room)
    }

    //send message to the room
    @SubscribeMessage('send-message')
    sendMessage(socket: Socket, data: { to: string, message: string }) {
        this.chatService.sendMessage(socket, data)
    }

    //send message to the room
    @SubscribeMessage('get-rooms')
    async getRooms(socket:Socket, data) {
         this.chatService.getRooms(socket);
    }


    @SubscribeMessage('leave-room')
    leaveRoom(socket:Socket, data) {
        this.chatService.leaveRoom(socket, data)
    }

}