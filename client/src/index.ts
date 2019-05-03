import "./styles.css";
import { App } from './application/App';

const elementId = "render";
const app = new App(elementId);

window.addEventListener('DOMContentLoaded', () => {
    app.initialize();
    app.run();
});

window.addEventListener('resize', () => app.resize());
