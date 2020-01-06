"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class ResolutionsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('resolutions');
        super.ensureIndex({ org_id: 1 });
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    unsetRule(correlationId, orgId, ruleId, callback) {
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
            if (callback)
                callback(err);
        });
    }
}
exports.ResolutionsMongoDbPersistence = ResolutionsMongoDbPersistence;
//# sourceMappingURL=ResolutionsMongoDbPersistence.js.map