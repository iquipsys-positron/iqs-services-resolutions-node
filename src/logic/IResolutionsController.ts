import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { ResolutionV1 } from '../data/version1/ResolutionV1';

export interface IResolutionsController {
    getResolutions(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ResolutionV1>) => void): void;

    getResolutionById(correlationId: string, resolution_id: string, 
        callback: (err: any, resolution: ResolutionV1) => void): void;

    createResolution(correlationId: string, resolution: ResolutionV1, 
        callback: (err: any, resolution: ResolutionV1) => void): void;

    updateResolution(correlationId: string, resolution: ResolutionV1, 
        callback: (err: any, resolution: ResolutionV1) => void): void;

    deleteResolutionById(correlationId: string, resolution_id: string,
        callback: (err: any, resolution: ResolutionV1) => void): void;

    unsetRule(correlationId: string, orgId: string, ruleId: string,
        callback: (err: any) => void): void;
}
