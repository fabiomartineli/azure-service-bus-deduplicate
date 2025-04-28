import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { AppService } from "./app.service";

@Injectable()
export class AppSubscriber implements OnApplicationBootstrap {
    private readonly _service: AppService;

    constructor(appService: AppService) {
        this._service = appService;
    }

    async onApplicationBootstrap(): Promise<void> {
        await this._service.listenAsync();
    }

}