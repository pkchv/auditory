import './styles.css';

import { App } from './application/App';
import { config } from './application/config/Config';

const elementId = "render";
const app = new App(elementId, config);

window.addEventListener('DOMContentLoaded', () => {
    app.initialize();
    app.addMockEntities();
    app.loadAssets().then(() => {
        app.run();
    });
});

window.addEventListener('resize', () => app.resize());
window.addEventListener('beforeunload', () => app.close());
