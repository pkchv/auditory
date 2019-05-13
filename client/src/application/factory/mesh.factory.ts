import { MeshBuilder, Scene } from 'babylonjs';

import { MeshDto } from '../dto/mesh.dto';
import { computePosition } from '../utility/compute-position';
import { toVector3 } from '../utility/to-vector3';

export class MeshFactory {

    private readonly sandboxSize: number = 2048;

    constructor(
        private readonly scene: Scene,
    ) {}

    private computeSize(size: number) {
        const _size = Math.floor(size * this.sandboxSize);
        return _size;
    }

    create(name: string, data: MeshDto, interactive: boolean = true) {
        const size = this.computeSize(data.width);

        const mesh = MeshBuilder.CreateSphere(
            name,
            { diameter: this.computeSize(data.width) },
            this.scene
        );

        const position = toVector3(data.position);
        mesh.position = computePosition(position, this.sandboxSize, this.sandboxSize, this.sandboxSize, data.width, data.height);
        mesh.rotation = toVector3(data.rotation);
        mesh['_interactive'] = interactive;
        mesh['_width'] = data.width;
        mesh['_height'] = data.height;
        return mesh;
    }

    createPlayer(name: string, data: MeshDto) {
        const mesh = MeshBuilder.CreateBox(
            name,
            { width: 1, height: 10, depth: 2 },
            this.scene
        );

        const position = toVector3(data.position);
        mesh.position = computePosition(position, this.sandboxSize, this.sandboxSize, this.sandboxSize, data.width, data.height);
        mesh.position.y = (-this.sandboxSize / 2) + 85;
        mesh['_width'] = data.width;
        mesh['_height'] = data.height;
        return mesh;
    }

}
