import { IStringIdentifiable } from 'pip-services3-commons-node';

export class ResolutionV1 implements IStringIdentifiable {
    public id: string;
    public org_id: string;
    public rule_ids: string[];
    public default?: boolean;
    public resolution: string;
}