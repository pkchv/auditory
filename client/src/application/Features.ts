import { isWebVRCapable } from './utility/is-web-vr-capable';

interface IFeatures {
    webVR: boolean;
}

const features = {
    webVR: isWebVRCapable()
};

export { features, IFeatures };
