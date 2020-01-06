let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { TagsProcessor } from 'pip-services3-commons-node';

import { ResolutionV1 } from '../data/version1/ResolutionV1';
import { IResolutionsPersistence } from './IResolutionsPersistence';

export class ResolutionsMemoryPersistence 
    extends IdentifiableMemoryPersistence<ResolutionV1, string> 
    implements IResolutionsPersistence {

    constructor() {
        super();
        this._maxPageSize = 1000;
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: ResolutionV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.resolution, search))
            return true;
        return false;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let org_id = filter.getAsNullableString('org_id');
        let rule_id = filter.getAsNullableString('rule_id');
                
        return (item) => {
            if (id && item.id != id) 
                return false;
            if (rule_id && _.indexOf(item.rule_ids, rule_id) < 0) 
                return false;
            if (org_id && item.org_id != org_id) 
                return false;
            if (search && !this.matchSearch(item, search)) 
                return false;
            return true; 
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<ResolutionV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public unsetRule(correlationId: string, orgId: string, ruleId: string,
        callback: (err: any) => void): void {

        let updated = false;
        _.each(this._items, (item) => {
            if (item.org_id == orgId && _.indexOf(item.rule_ids, ruleId) >= 0) {
                updated = true;
                item.rule_ids = _.remove(item.rule_ids, (i) => i == ruleId);
            }
        });

        if (!updated) {
            if (callback) callback(null);
            return;
        }

        this._logger.trace(correlationId, "Unset rule %s", ruleId);

        this.save(correlationId, (err) => {
            if (callback) callback(err);
        });
    }

}
