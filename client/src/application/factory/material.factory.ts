import { Scene } from 'babylonjs';

import { MaterialDto } from '../dto/material.dto';
import { createGridMaterial } from '../utility/create-grid-material';
import { toColor3 } from '../utility/to-color3';

export class MaterialFactory {

    constructor(
        private readonly scene: Scene,
    ) {}

    create(_material: MaterialDto) {
        const { majorUnitFrequency, minorUnitVisibility,
            gridRatio, opacity } = _material;

        return createGridMaterial(this.scene, {
            majorUnitFrequency,
            minorUnitVisibility,
            gridRatio,
            mainColor: toColor3(_material.mainColor),
            lineColor: toColor3(_material.lineColor),
            opacity,
        });
    }

}
