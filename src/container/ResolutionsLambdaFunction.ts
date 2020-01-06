import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { ResolutionsServiceFactory } from '../build/ResolutionsServiceFactory';

export class ResolutionsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("resolutions", "Incident resolutions function");
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-resolutions', 'controller', 'default', '*', '*'));
        this._factories.add(new ResolutionsServiceFactory());
    }
}

export const handler = new ResolutionsLambdaFunction().getHandler();