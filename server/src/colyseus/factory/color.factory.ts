import { Color } from '../../entities/color.entity';

const random = require('random');

export class ColorFactory {
    random(): Color {
        return new Color({
            r: random.float(),
            g: random.float(),
            b: random.float(),
        });
    }
}
