"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const ResolutionsCommandSet_1 = require("./ResolutionsCommandSet");
class ResolutionsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(ResolutionsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new ResolutionsCommandSet_1.ResolutionsCommandSet(this);
        return this._commandSet;
    }
    getResolutions(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getResolutionById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    createResolution(correlationId, resolution, callback) {
        this._persistence.create(correlationId, resolution, callback);
    }
    updateResolution(correlationId, resolution, callback) {
        this._persistence.update(correlationId, resolution, callback);
    }
    deleteResolutionById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
    unsetRule(correlationId, orgId, ruleId, callback) {
        this._persistence.unsetRule(correlationId, orgId, ruleId, callback);
    }
}
exports.ResolutionsController = ResolutionsController;
ResolutionsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'iqs-services-resolutions:persistence:*:*:1.0');
//# sourceMappingURL=ResolutionsController.js.map