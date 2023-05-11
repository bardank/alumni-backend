import { MessageResponse } from './../chat/dto/message.response.dto';
import { Message, MessageModel } from './../models/message.model';
import { Response } from 'express';
import { Model } from 'mongoose';

type MessagePayload = {
  messageAdded: MessageResponse;
};

export default MessagePayload;
