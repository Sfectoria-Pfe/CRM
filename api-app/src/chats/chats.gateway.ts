import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatsGateway {
  constructor(private readonly chatsService: ChatsService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('send-message')
  async create(client: Socket, dto: CreateChatDto) {
    const msg = await this.chatsService.create(dto);
    const teamManager = await this.chatsService.findManager(dto.opportunityId);
    this.server.emit('new-msg/' + dto.opportunityId + '/' + dto.senderId, msg);
    if (dto.receiverId)
      this.server.emit(
        'new-msg/' + dto.opportunityId + '/' + dto.receiverId,
        msg,
      );
    else
      this.server.emit(
        'new-msg/' + dto.opportunityId + '/' + teamManager.id,
        msg,
      );
  }

  @SubscribeMessage('demand-list-client-opportunity')
  async findAllClientByOpportunity(client: Socket, body: any) {
    const response = await this.chatsService.findAllByOpportunity(
      +body.opportunityId,
    );

    this.server.emit('list-list-client/' + body.opportunityId, response);
  }

  @SubscribeMessage('find-all-msgs-opportunity-client')
  async findOneClientByOpportunity(client: Socket, body: any) {
    const response = await this.chatsService.findMsgsOpportunityClient(
      +body.opportunityId,
      body.clientId,
    );
    console.log(
      'response of ' + body.opportunityId + 'and' + body.clientId,
      response,
    );
    this.server.emit(
      'get-all-msgs-opportunity-client/' +
        body.opportunityId +
        '/' +
        body.clientId,
      response,
    );
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatsService.remove(id);
  }
}
