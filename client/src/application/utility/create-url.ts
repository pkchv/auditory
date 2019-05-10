
export function createUrl(protocol: string, address: string, port: number, endpoint: string = '') {
    return `${protocol}://${address}:${port}${endpoint}`;
}
