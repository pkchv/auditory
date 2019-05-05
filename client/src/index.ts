import './styles.css';

import { App } from './application/App';
import { config } from './application/Config';
import { features } from './application/Features';

const elementId = "render";
const app = new App(elementId, config, features);

window.addEventListener('DOMContentLoaded', () => {
    app.initialize();
    app.run();
});

window.addEventListener('resize', () => app.resize());
window.addEventListener('beforeunload', () => app.close());
