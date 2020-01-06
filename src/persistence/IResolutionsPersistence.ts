import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { ResolutionV1 } from '../data/version1/ResolutionV1';

export interface IResolutionsPersistence extends IGetter<ResolutionV1, string>, IWriter<ResolutionV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ResolutionV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: ResolutionV1) => void): void;

    create(correlationId: string, item: ResolutionV1, 
        callback: (err: any, item: ResolutionV1) => void): void;

    update(correlationId: string, item: ResolutionV1, 
        callback: (err: any, item: ResolutionV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: ResolutionV1) => void): void;

    unsetRule(correlationId: string, orgId: string, ruleId: string,
        callback: (err: any) => void): void;
}
