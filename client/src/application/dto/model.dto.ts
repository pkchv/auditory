import { MaterialDto } from './material.dto';
import { MeshDto } from './mesh.dto';
import { SoundDto } from './sound.dto';

export class ModelDto {
    id: number;
    material: MaterialDto;
    mesh: MeshDto;
    sound: SoundDto;
}
