import {join, resolve} from 'path';

export const PACKAGE_ROOT = resolve(__dirname, '../..');
export const SERVER_PATH = join(PACKAGE_ROOT, 'dist', 'npm', 'server', 'index.js');
export const PROJECT_PATH = join(PACKAGE_ROOT, 'integration', 'project');
export const APP_COMPONENT = join(PROJECT_PATH, 'app', 'app.component.ts');
export const APP_COMPONENT_URI = `file://${APP_COMPONENT}`;
export const FOO_TEMPLATE = join(PROJECT_PATH, 'app', 'foo.component.html');
export const FOO_TEMPLATE_URI = `file://${FOO_TEMPLATE}`;
export const FOO_COMPONENT = join(PROJECT_PATH, 'app', 'foo.component.ts');
export const FOO_COMPONENT_URI = `file://${FOO_COMPONENT}`;
export const TSCONFIG = join(PROJECT_PATH, 'tsconfig.json');