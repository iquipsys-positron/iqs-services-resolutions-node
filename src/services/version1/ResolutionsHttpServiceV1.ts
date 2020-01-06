import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class ResolutionsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/resolutions');
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-resolutions', 'controller', 'default', '*', '1.0'));
    }
}