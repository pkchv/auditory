
export function isWebVRCapable() {
    return 'getVRDisplays' in navigator;
}
