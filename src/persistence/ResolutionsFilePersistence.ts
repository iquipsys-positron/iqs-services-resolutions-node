import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';

import { ResolutionsMemoryPersistence } from './ResolutionsMemoryPersistence';
import { ResolutionV1 } from '../data/version1/ResolutionV1';

export class ResolutionsFilePersistence extends ResolutionsMemoryPersistence {
	protected _persister: JsonFilePersister<ResolutionV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<ResolutionV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}