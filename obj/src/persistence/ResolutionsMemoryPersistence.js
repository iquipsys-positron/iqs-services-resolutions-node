"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class ResolutionsMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.resolution, search))
            return true;
        return false;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    unsetRule(correlationId, orgId, ruleId, callback) {
        let updated = false;
        _.each(this._items, (item) => {
            if (item.org_id == orgId && _.indexOf(item.rule_ids, ruleId) >= 0) {
                updated = true;
                item.rule_ids = _.remove(item.rule_ids, (i) => i == ruleId);
            }
        });
        if (!updated) {
            if (callback)
                callback(null);
            return;
        }
        this._logger.trace(correlationId, "Unset rule %s", ruleId);
        this.save(correlationId, (err) => {
            if (callback)
                callback(err);
        });
    }
}
exports.ResolutionsMemoryPersistence = ResolutionsMemoryPersistence;
//# sourceMappingURL=ResolutionsMemoryPersistence.js.map