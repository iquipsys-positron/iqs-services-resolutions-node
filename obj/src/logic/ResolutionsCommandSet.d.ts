import { CommandSet } from 'pip-services3-commons-node';
import { IResolutionsController } from './IResolutionsController';
export declare class ResolutionsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IResolutionsController);
    private makeGetResolutionsCommand;
    private makeGetResolutionByIdCommand;
    private makeCreateResolutionCommand;
    private makeUpdateResolutionCommand;
    private makeDeleteResolutionByIdCommand;
    private makeUnsetRuleCommand;
}
