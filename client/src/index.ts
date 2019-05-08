import './styles.css';

import { App } from './application/App';
import { config } from './application/Config';

const elementId = "render";
const app = new App(elementId, config);

window.addEventListener('DOMContentLoaded', () => {
    app.initialize();
    app.addMockEntities();
    app.run();
});

window.addEventListener('resize', () => app.resize());
window.addEventListener('beforeunload', () => app.close());
