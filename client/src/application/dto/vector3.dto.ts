
export class Vector3Dto {
    x: number;
    y: number;
    z: number;

    constructor(partial: Partial<Vector3Dto> = { x: 0, y: 0, z: 0}) {
        Object.assign(this, partial);
    }

}
