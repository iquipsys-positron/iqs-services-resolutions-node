import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { ResolutionV1 } from '../data/version1/ResolutionV1';
import { ResolutionV1Schema } from '../data/version1/ResolutionV1Schema';
import { IResolutionsController } from './IResolutionsController';

export class ResolutionsCommandSet extends CommandSet {
    private _logic: IResolutionsController;

    constructor(logic: IResolutionsController) {
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

	private makeGetResolutionsCommand(): ICommand {
		return new Command(
			"get_resolutions",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getResolutions(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetResolutionByIdCommand(): ICommand {
		return new Command(
			"get_resolution_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('resolution_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let resolution_id = args.getAsString("resolution_id");
                this._logic.getResolutionById(correlationId, resolution_id, callback);
            }
		);
	}

	private makeCreateResolutionCommand(): ICommand {
		return new Command(
			"create_resolution",
			new ObjectSchema(true)
				.withRequiredProperty('resolution', new ResolutionV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let resolution = args.get("resolution");
                this._logic.createResolution(correlationId, resolution, callback);
            }
		);
	}

	private makeUpdateResolutionCommand(): ICommand {
		return new Command(
			"update_resolution",
			new ObjectSchema(true)
				.withRequiredProperty('resolution', new ResolutionV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let resolution = args.get("resolution");
                this._logic.updateResolution(correlationId, resolution, callback);
            }
		);
	}
	
	private makeDeleteResolutionByIdCommand(): ICommand {
		return new Command(
			"delete_resolution_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('resolution_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let resolutionId = args.getAsNullableString("resolution_id");
                this._logic.deleteResolutionById(correlationId, resolutionId, callback);
			}
		);
	}

	private makeUnsetRuleCommand(): ICommand {
		return new Command(
			"unset_rule",
			new ObjectSchema(true)
				.withRequiredProperty('org_id', TypeCode.String)
				.withRequiredProperty('rule_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let orgId = args.getAsNullableString("org_id");
                let ruleId = args.getAsNullableString("rule_id");
                this._logic.unsetRule(correlationId, orgId, ruleId, (err) => {
					if (callback) callback(err, null)
				});
			}
		);
	}

}