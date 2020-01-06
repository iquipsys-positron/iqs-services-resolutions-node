"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class ResolutionsHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/resolutions');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-resolutions', 'controller', 'default', '*', '1.0'));
    }
}
exports.ResolutionsHttpServiceV1 = ResolutionsHttpServiceV1;
//# sourceMappingURL=ResolutionsHttpServiceV1.js.map