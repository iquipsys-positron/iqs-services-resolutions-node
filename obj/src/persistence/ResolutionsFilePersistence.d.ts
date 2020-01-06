import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { ResolutionsMemoryPersistence } from './ResolutionsMemoryPersistence';
import { ResolutionV1 } from '../data/version1/ResolutionV1';
export declare class ResolutionsFilePersistence extends ResolutionsMemoryPersistence {
    protected _persister: JsonFilePersister<ResolutionV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
