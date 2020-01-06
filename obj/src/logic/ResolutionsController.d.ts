import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { ResolutionV1 } from '../data/version1/ResolutionV1';
import { IResolutionsController } from './IResolutionsController';
export declare class ResolutionsController implements IConfigurable, IReferenceable, ICommandable, IResolutionsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getResolutions(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<ResolutionV1>) => void): void;
    getResolutionById(correlationId: string, id: string, callback: (err: any, resolution: ResolutionV1) => void): void;
    createResolution(correlationId: string, resolution: ResolutionV1, callback: (err: any, resolution: ResolutionV1) => void): void;
    updateResolution(correlationId: string, resolution: ResolutionV1, callback: (err: any, resolution: ResolutionV1) => void): void;
    deleteResolutionById(correlationId: string, id: string, callback: (err: any, resolution: ResolutionV1) => void): void;
    unsetRule(correlationId: string, orgId: string, ruleId: string, callback: (err: any) => void): void;
}
