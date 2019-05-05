import { ModelDto } from './model.dto';

export class PlayerDto {
    id: number;
    uuid: string;
    name: string;
    model: ModelDto;
}
