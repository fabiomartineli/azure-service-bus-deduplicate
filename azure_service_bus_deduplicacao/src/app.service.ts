import { ServiceBusClient, ServiceBusSender } from '@azure/service-bus';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setTimeout } from "timers/promises";
import { hash } from "crypto";

@Injectable({ scope: Scope.DEFAULT })
export class AppService {
  private static _serviceBusClient: ServiceBusClient;
  private static _serviceBusPublisher: ServiceBusSender;
  private _logger: Logger;

  constructor(logger: Logger, config: ConfigService) {
    AppService._serviceBusClient = new ServiceBusClient(config.get("SERVICE_BUS_CONNECTIONSTRING"));
    AppService._serviceBusPublisher = AppService._serviceBusClient.createSender(config.get("SERVICE_BUS_QUEUE_NAME"));

    this._logger = logger;
  }

  async publishAsync(id: string, content: any): Promise<void> {
    const messageIdByContent = `${id}_${hash('md5', JSON.stringify(content), "hex")}`;

    AppService._serviceBusPublisher.sendMessages({
      body: content,
      contentType: "application/json",
      messageId: messageIdByContent
    });
  }

  async listenAsync(): Promise<void> {
    const receiver = AppService._serviceBusClient.createReceiver(process.env.SERVICE_BUS_QUEUE_NAME, {
      receiveMode: "peekLock",
      skipParsingBodyAsJson: false,
      maxAutoLockRenewalDurationInMs: 1000 * 60 * 5
    });

    receiver.subscribe({
      processMessage: async (message) => {
        this._logger.log(`[Message bus ${receiver.entityPath}] - Receiving new message: ${message.messageId}`);

        await setTimeout(1000 * 30);
        await receiver.completeMessage(message);

      },
      processError: async (arg) => this._logger.error(`[Message bus ${arg.entityPath}] - Error when proccess message: ${arg.error}`)
    }, {
      autoCompleteMessages: false,
      maxConcurrentCalls: 2
    });
  }
}
