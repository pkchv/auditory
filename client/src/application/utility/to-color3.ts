import { Color3 } from 'babylonjs';

import { ColorDto } from '../dto/color.dto';

export function toColor3(v: ColorDto | Array<number>) {
    if (v instanceof Array) {
        return new Color3(...Object.assign([0, 0, 0], v.slice(0, 3)));
    }

    return new Color3(v.r || 0, v.g || 0, v.b || 0);
}
