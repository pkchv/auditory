
export function createUrl(protocol: string, address: string, port: number) {
    return `${protocol}://${address}:${port}`;
}
