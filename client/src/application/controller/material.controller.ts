import { Material, Scene } from 'babylonjs';

import { MaterialDto } from '../dto/material.dto';
import { MaterialFactory } from '../factory/material.factory';

export class MaterialController {

    private readonly _factory: MaterialFactory;
    private readonly _materials: Map<string, Material>

    constructor(
        private readonly scene: Scene,
    ) {
        this._factory = new MaterialFactory(this.scene);
        this._materials = new Map();
    }

    create(id: string, data: MaterialDto): Material {
        const material = this._factory.create(data);
        this._materials.set(id, material);
        return material;
    }

    fetch(id: string): Material {
        return this._materials.get(id);
    }

    update(id: string, data: MaterialDto): Material {
        return this._materials.get(id);
    }

    remove(id: string): void {
        const material = this._materials.get(id);
        this.dispose(material);
        this._materials.delete(id);
    }

    private dispose(material: Material): void {
        // removes mesh from scene
        material.dispose();

        // informs GC it's okay to collect
        material = null;
    }

}
