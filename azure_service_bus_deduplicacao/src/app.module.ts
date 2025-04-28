import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppSubscriber } from './app.subscriber';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppSubscriber, Logger],
})
export class AppModule {}
