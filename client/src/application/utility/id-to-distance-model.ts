
export function idToDistanceModel(id: number): string {
    switch (id) {
        case 0:
            return 'linear';
        case 1:
            return 'exponential';
        case 2:
            return 'inverse';
        default:
            return 'linear';
    }
}
