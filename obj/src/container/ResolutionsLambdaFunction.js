"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const ResolutionsServiceFactory_1 = require("../build/ResolutionsServiceFactory");
class ResolutionsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("resolutions", "Incident resolutions function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-resolutions', 'controller', 'default', '*', '*'));
        this._factories.add(new ResolutionsServiceFactory_1.ResolutionsServiceFactory());
    }
}
exports.ResolutionsLambdaFunction = ResolutionsLambdaFunction;
exports.handler = new ResolutionsLambdaFunction().getHandler();
//# sourceMappingURL=ResolutionsLambdaFunction.js.map