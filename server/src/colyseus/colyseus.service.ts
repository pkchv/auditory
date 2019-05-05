import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'colyseus';
import { RoomConstructor } from 'colyseus/lib/Room';
import * as http from 'http';
import { ConfigService, InjectConfig } from 'nestjs-config';

import { GameRoom } from './game-room';
import express = require('express');
import cors = require('cors');

@Injectable()
export class ColyseusService {

  private readonly logger = new Logger(ColyseusService.name);

  private readonly internalServerRef: http.Server;

  private readonly server: Server;

  constructor(
    @InjectConfig() private readonly config: ConfigService,
  ) {
    const app = express();
    app.use(cors());
    this.internalServerRef = http.createServer(app);
    this.server = new Server({ server: this.internalServerRef });
    const port = this.config.get('game-server.port', 8081);
    const id = this.config.get('room.name', 'default');
    this.registerDefaultRoom(id);
    this.logger.log(`Game server listens on port ${port}`);
    this.server.listen(port);
  }

  async register(id: string, handler: RoomConstructor<any>, options?: any) {
    this.logger.log(`Registering game room with id: '${id}'`);
    this.logger.debug(`Room settings:`);
    this.logger.debug(options);
    await this.server.register(id, handler, options);
  }

  private registerDefaultRoom(id) {
    const options = Object.assign({ id }, this.config.get('room'));
    this.register(id, GameRoom, options);
  }

}
