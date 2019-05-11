import * as fs from 'fs';
import * as path from 'path';

export const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../../../cert/localhost.key')),
    cert: fs.readFileSync(path.join(__dirname, '../../../cert/localhost.crt')),
};
