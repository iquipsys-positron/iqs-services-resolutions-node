import { IStringIdentifiable } from 'pip-services3-commons-node';
export declare class ResolutionV1 implements IStringIdentifiable {
    id: string;
    org_id: string;
    rule_ids: string[];
    default?: boolean;
    resolution: string;
}
