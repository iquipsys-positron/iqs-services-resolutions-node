let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { ResolutionV1 } from '../data/version1/ResolutionV1';
import { IResolutionsPersistence } from './IResolutionsPersistence';

export class ResolutionsMongoDbPersistence extends IdentifiableMongoDbPersistence<ResolutionV1, string> implements IResolutionsPersistence {

    constructor() {
        super('resolutions');
        super.ensureIndex({ org_id: 1 });
        this._maxPageSize = 1000;
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ resolution: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null)
            criteria.push({ org_id: orgId });

        let ruleId = filter.getAsNullableString('rule_id');
        if (ruleId != null)
            criteria.push({ rule_ids: ruleId });

        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ResolutionV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public unsetRule(correlationId: string, orgId: string, ruleId: string,
        callback: (err: any) => void): void {

        let filter = {
            org_id: orgId
        };

        let change = {
            $pull: { 
                rule_ids: ruleId
            }
        };

        this._collection.update(filter, change, (err, count) => {
            if (!err)
                this._logger.trace(correlationId, "Unset rule %s from %s", ruleId, this._collection);

            if (callback) callback(err);
        });
    }

}
