import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    getWarningFile(id: string) {
        return `${id}.amoc.xml`;
    }

    cleanWarningKey(id: string) {
        return id.replace(/\.amoc\.xml/, '');
    }
}
