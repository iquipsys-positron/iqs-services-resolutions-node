import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { ResolutionsServiceFactory } from '../build/ResolutionsServiceFactory';

export class ResolutionsProcess extends ProcessContainer {

    public constructor() {
        super("resolutions", "Incident resolutions microservice");
        this._factories.add(new ResolutionsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
