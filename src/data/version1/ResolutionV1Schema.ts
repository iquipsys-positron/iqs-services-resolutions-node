import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class ResolutionV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('org_id', TypeCode.String);
        this.withOptionalProperty('rule_ids', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('default', TypeCode.Boolean);
        this.withRequiredProperty('resolution', TypeCode.String);
    }
}
