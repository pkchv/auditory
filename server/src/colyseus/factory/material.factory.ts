import { Material } from '../../entities/material.entity';
import { ColorFactory } from './color.factory';

const random = require('random');

export class MaterialFactory {

    private readonly color = new ColorFactory();

    random(): Material {
        return new Material({
            majorUnitFrequency: random.integer(1, 4),
            minorUnitVisibility: random.float(0.5, 1),
            gridRatio: random.integer(1, 16),
            mainColor: this.color.random(),
            lineColor: this.color.random(),
            opacity: 1,
        });
    }

}
