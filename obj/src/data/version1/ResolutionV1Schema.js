"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
class ResolutionV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('org_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('rule_ids', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
        this.withOptionalProperty('default', pip_services3_commons_node_3.TypeCode.Boolean);
        this.withRequiredProperty('resolution', pip_services3_commons_node_3.TypeCode.String);
    }
}
exports.ResolutionV1Schema = ResolutionV1Schema;
//# sourceMappingURL=ResolutionV1Schema.js.map