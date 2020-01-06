import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';

import { ResolutionV1 } from '../data/version1/ResolutionV1';
import { IResolutionsPersistence } from '../persistence/IResolutionsPersistence';
import { IResolutionsController } from './IResolutionsController';
import { ResolutionsCommandSet } from './ResolutionsCommandSet';

export class ResolutionsController implements  IConfigurable, IReferenceable, ICommandable, IResolutionsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'iqs-services-resolutions:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ResolutionsController._defaultConfig);
    private _persistence: IResolutionsPersistence;
    private _commandSet: ResolutionsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IResolutionsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ResolutionsCommandSet(this);
        return this._commandSet;
    }
    
    public getResolutions(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<ResolutionV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getResolutionById(correlationId: string, id: string, 
        callback: (err: any, resolution: ResolutionV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);        
    }

    public createResolution(correlationId: string, resolution: ResolutionV1, 
        callback: (err: any, resolution: ResolutionV1) => void): void {
        this._persistence.create(correlationId, resolution, callback);
    }

    public updateResolution(correlationId: string, resolution: ResolutionV1, 
        callback: (err: any, resolution: ResolutionV1) => void): void {
        this._persistence.update(correlationId, resolution, callback);
    }

    public deleteResolutionById(correlationId: string, id: string,
        callback: (err: any, resolution: ResolutionV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

    public unsetRule(correlationId: string, orgId: string, ruleId: string,
        callback: (err: any) => void): void {
        this._persistence.unsetRule(correlationId, orgId, ruleId, callback);
    }
}
