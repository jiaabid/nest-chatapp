import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from "@nestjs/websockets/interfaces"
import { WebSocketServer } from "@nestjs/websockets/decorators"
import { Server, Socket } from "socket.io";
@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() wss;

    afterInit(server: Server) {
        console.log(server,'this is sercwe')
    }

    handleDisconnect(client: Socket) {
        console.log(`Client Disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client Connected: ${client.id}`);
    }


    @SubscribeMessage('hello')
    connectClient(client, data): void {
        // console.log(client, data)
        client.emit(data)
    }
}