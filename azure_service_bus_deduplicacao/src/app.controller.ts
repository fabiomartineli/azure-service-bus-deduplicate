import { Body, Controller, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller("messages")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async sendMessages(@Body() request: any, @Res() response: Response) {
    await this.appService.publishAsync(request.id, request.content);
    response.status(200).send();

    return response;
  }
}
