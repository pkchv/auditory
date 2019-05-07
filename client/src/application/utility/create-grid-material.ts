import * as uuid from 'uuid/v1';
import { Color3, Scene } from 'babylonjs';
import { GridMaterial } from 'babylonjs-materials';

const random = require('random');

interface IGridMaterialDef {
    majorUnitFrequency: number;
    minorUnitVisibility: number;
    gridRatio: number;
    mainColor: Color3;
    lineColor: Color3;
    opacity: number;
}

const defaults: IGridMaterialDef = {
    majorUnitFrequency: random.integer(0, 8),
    minorUnitVisibility: random.float(0, 1),
    gridRatio: random.integer(0, 4),
    mainColor: new Color3(random.float(), random.float(), random.float()),
    lineColor: new Color3(random.float(), random.float(), random.float()),
    opacity: 1
};

export function createGridMaterial(
        scene: Scene,
        def: Partial<IGridMaterialDef> = defaults,
        id: string = uuid()
    ) {
    return Object.assign(new GridMaterial(id, scene), def);
}
