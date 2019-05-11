import * as uuid from 'uuid/v1';
import { Color3, Scene } from 'babylonjs';
import { GridMaterial } from 'babylonjs-materials';
import { IGridMaterialDef } from '../interfaces/IGridMaterialDef';

const random = require('random');

function randomColor() {
    return new Color3(random.float(), random.float(), random.float());
}


const defaults: IGridMaterialDef = {
    majorUnitFrequency: random.integer(1, 4),
    minorUnitVisibility: random.float(0.5, 1),
    gridRatio: random.integer(1, 16),
    mainColor: randomColor(),
    lineColor: randomColor(),
    opacity: 1
};

export function createGridMaterial(
        scene: Scene,
        def: Partial<IGridMaterialDef> = defaults,
        id: string = uuid()
    ): GridMaterial {
    return Object.assign(new GridMaterial(id, scene), def);
}
