"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const ResolutionsServiceFactory_1 = require("../build/ResolutionsServiceFactory");
class ResolutionsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("resolutions", "Incident resolutions microservice");
        this._factories.add(new ResolutionsServiceFactory_1.ResolutionsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.ResolutionsProcess = ResolutionsProcess;
//# sourceMappingURL=ResolutionsProcess.js.map