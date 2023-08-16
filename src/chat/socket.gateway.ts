import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from "@nestjs/websockets/interfaces"
import { WebSocketServer } from "@nestjs/websockets/decorators"
import { Server, Socket } from "socket.io";
import { Inject } from "@nestjs/common";
import { roleEnums } from "src/utils/message.utility";
@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private rooms = [];
    @WebSocketServer() wss;

    afterInit(server: Server) {
        console.log(server, 'this is sercwe')
    }

    handleDisconnect(client: Socket) {
        console.log(`Client Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client Connected: ${client.id}`);
        //if it has token, it means its a customer representative
        if (client.handshake.query.token) {
            //join room
            this.wss.emit('available-cr', this.rooms)
        } else {
            //boradcast this to the CR clients
            this.wss.emit('new-user', { client: client.id })
        }
    }

    //when CR accept the user request, send to join-room request to the user interface
    @SubscribeMessage('accept-user')
    acceptUser(socket, data): void {
        // console.log(socket, data)
        this.rooms.push({
            id: `${socket.id}_${data.client}`
        })
        socket.to(data.client).emit('join-room-request', { representative: socket.id })
    }

    //user interface on receiving the join room request, emits the join-room event
    @SubscribeMessage('join-room')
    joinRoom(socket, data) {
        let myRoom = this.rooms.find(room => room.id.includes(socket.id))
        socket.join(myRoom)
        socket.emit('room-joined',{room:myRoom})
    }

    //send message to the room
    @SubscribeMessage('send-message')
    sendMessage(client, data) {
        client.to(data.to).emit("message", { message: data.message })
    }


    // @SubscribeMessage('create-my-room')
    // createRepresentativeRoom(client, data) {
    //     if(data.role == roleEnums.CR){
    //         this.rooms.push({
    //            id:data.userId,
    //            socketId:client.id
    //         })
    //          client.join(`${data.userId}`)
    //          this.wss.emit('available-cr',this.rooms)
    //     }else{
    //         client.emit('error',{message:"You are not allowed to create your room"})
    //     }
    //     // client.emit(data)
    // }

    // @SubscribeMessage('hello')
    // connectClient(client, data): void {
    //     // console.log(client, data)
    //     client.emit(data)
    // }
}