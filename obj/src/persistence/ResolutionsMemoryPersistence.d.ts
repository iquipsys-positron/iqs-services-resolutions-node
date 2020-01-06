import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { ResolutionV1 } from '../data/version1/ResolutionV1';
import { IResolutionsPersistence } from './IResolutionsPersistence';
export declare class ResolutionsMemoryPersistence extends IdentifiableMemoryPersistence<ResolutionV1, string> implements IResolutionsPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ResolutionV1>) => void): void;
    unsetRule(correlationId: string, orgId: string, ruleId: string, callback: (err: any) => void): void;
}
