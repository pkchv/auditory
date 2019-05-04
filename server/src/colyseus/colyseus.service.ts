import { Injectable, Logger, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Server } from 'colyseus';
import { RoomConstructor } from 'colyseus/lib/Room';
import * as http from 'http';
import { generate as generateRoomId } from 'namor';
import { ConfigService, InjectConfig } from 'nestjs-config';

import { GameRoom } from './game-room';

@Injectable()
export class ColyseusService implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown {

  private readonly logger = new Logger(ColyseusService.name);

  private readonly internalServerRef: http.Server;

  private readonly server: Server;

  constructor(
    @InjectConfig() private readonly config: ConfigService,
  ) {
    this.internalServerRef = http.createServer();
    this.server = new Server({ server: this.internalServerRef });
  }

  onModuleInit() {
    const port = this.config.get('game-server.port', 8081);
    const id = this.config.get('room.name', 'default');
    this.registerDefaultRoom(id);
    this.logger.log(`Game server listens on port ${port}`);
    this.server.listen(port);
  }

  register(id: string, handler: RoomConstructor<any>, options?: any) {
    this.logger.log(`Registering game room with id: '${id}'`);
    this.logger.debug(`Room settings:`);
    this.logger.debug(options);
    return this.server.register(id, handler, options);
  }

  private registerDefaultRoom(id) {
    const options = Object.assign({ id }, this.config.get('room'));
    this.register(id, GameRoom, options);
  }

  async onModuleDestroy() {
    return this.server.gracefullyShutdown();
  }

  async onApplicationShutdown() {
    return this.server.gracefullyShutdown();
  }

}
