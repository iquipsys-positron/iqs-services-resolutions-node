"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const ResolutionV1Schema_1 = require("../data/version1/ResolutionV1Schema");
class ResolutionsCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetResolutionsCommand());
        this.addCommand(this.makeGetResolutionByIdCommand());
        this.addCommand(this.makeCreateResolutionCommand());
        this.addCommand(this.makeUpdateResolutionCommand());
        this.addCommand(this.makeDeleteResolutionByIdCommand());
        this.addCommand(this.makeUnsetRuleCommand());
    }
    makeGetResolutionsCommand() {
        return new pip_services3_commons_node_2.Command("get_resolutions", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getResolutions(correlationId, filter, paging, callback);
        });
    }
    makeGetResolutionByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_resolution_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('resolution_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let resolution_id = args.getAsString("resolution_id");
            this._logic.getResolutionById(correlationId, resolution_id, callback);
        });
    }
    makeCreateResolutionCommand() {
        return new pip_services3_commons_node_2.Command("create_resolution", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('resolution', new ResolutionV1Schema_1.ResolutionV1Schema()), (correlationId, args, callback) => {
            let resolution = args.get("resolution");
            this._logic.createResolution(correlationId, resolution, callback);
        });
    }
    makeUpdateResolutionCommand() {
        return new pip_services3_commons_node_2.Command("update_resolution", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('resolution', new ResolutionV1Schema_1.ResolutionV1Schema()), (correlationId, args, callback) => {
            let resolution = args.get("resolution");
            this._logic.updateResolution(correlationId, resolution, callback);
        });
    }
    makeDeleteResolutionByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_resolution_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('resolution_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let resolutionId = args.getAsNullableString("resolution_id");
            this._logic.deleteResolutionById(correlationId, resolutionId, callback);
        });
    }
    makeUnsetRuleCommand() {
        return new pip_services3_commons_node_2.Command("unset_rule", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_node_6.TypeCode.String)
            .withRequiredProperty('rule_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let orgId = args.getAsNullableString("org_id");
            let ruleId = args.getAsNullableString("rule_id");
            this._logic.unsetRule(correlationId, orgId, ruleId, (err) => {
                if (callback)
                    callback(err, null);
            });
        });
    }
}
exports.ResolutionsCommandSet = ResolutionsCommandSet;
//# sourceMappingURL=ResolutionsCommandSet.js.map