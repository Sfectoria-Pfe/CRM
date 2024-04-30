export class CreateChatDto {
  senderId: number;
  opportunityId: number;
  content: string;
  receiverId?: number;
}
