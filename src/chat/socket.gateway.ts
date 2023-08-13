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
        console.log(server,'this is sercwe')
    }

    handleDisconnect(client: Socket) {
        console.log(`Client Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client Connected: ${client.id}`);
        if(client.handshake.query.token){
            //join room
          
                this.rooms.push({
                
                   socketId:client.id
                })
                 client.join(`${client.id}`)
                 this.wss.emit('available-cr',this.rooms)
        }else{
            //boradcast this to the CR clients
            this.wss.emit('new-user',{client:client.id})
        }
    }


    @SubscribeMessage('hello')
    connectClient(client, data): void {
        // console.log(client, data)
        client.emit(data)
    }

    @SubscribeMessage('create-my-room')
    createRepresentativeRoom(client, data) {
        if(data.role == roleEnums.CR){
            this.rooms.push({
               id:data.userId,
               socketId:client.id
            })
             client.join(`${data.userId}`)
             this.wss.emit('available-cr',this.rooms)
        }else{
            client.emit('error',{message:"You are not allowed to create your room"})
        }
        // client.emit(data)
    }

    @SubscribeMessage('send-request')
    sendRequest(client, data) {
         let receiver = this.rooms.find(room=> room.id == data.to)
          client.to(receiver.socketId).emit('connection-request',{
            from: client.id,
            receiver 
          })
        // client.emit(data)
    }

    @SubscribeMessage('accept-request')
    AcceptRequest(client, data) {
         client.to(data.from).emit('request-reply',{
            accepted: data.accepted,
            to:data.from,
            from:data.receiver

         })
    }

    @SubscribeMessage('join-room')
    joinRoom(client, data) {
       client.join(data.room.id)
       client.emit("room-joined",{room:data.room.id})
       this.wss.to(data.room.id).emit('client-joined',{client:client.id})
    }
    @SubscribeMessage('send-message')
    sendMessage(client, data) {
       client.to(data.to).emit("message",{message:data.message})
    }

}