let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { ResolutionV1 } from '../../src/data/version1/ResolutionV1';

import { IResolutionsPersistence } from '../../src/persistence/IResolutionsPersistence';

let RESOLUTION1: ResolutionV1 = {
    id: '1',
    org_id: '1',
    rule_ids: ['1'],
    resolution: 'Resolution 1'
};
let RESOLUTION2: ResolutionV1 = {
    id: '2',
    org_id: '1',
    rule_ids: ['2'],
    resolution: 'Resolution 2'
};
let RESOLUTION3: ResolutionV1 = {
    id: '3',
    org_id: '2',
    rule_ids: ['1'],
    resolution: 'Resolution 3'
};

export class ResolutionsPersistenceFixture {
    private _persistence: IResolutionsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateResolutions(done) {
        async.series([
        // Create one resolution
            (callback) => {
                this._persistence.create(
                    null,
                    RESOLUTION1,
                    (err, resolution) => {
                        assert.isNull(err);

                        assert.isObject(resolution);
                        assert.equal(resolution.org_id, RESOLUTION1.org_id);
                        assert.sameMembers(resolution.rule_ids, RESOLUTION1.rule_ids);
                        assert.equal(resolution.resolution, RESOLUTION1.resolution);

                        callback();
                    }
                );
            },
        // Create another resolution
            (callback) => {
                this._persistence.create(
                    null,
                    RESOLUTION2,
                    (err, resolution) => {
                        assert.isNull(err);

                        assert.isObject(resolution);
                        assert.equal(resolution.org_id, RESOLUTION2.org_id);
                        assert.sameMembers(resolution.rule_ids, RESOLUTION2.rule_ids);
                        assert.equal(resolution.resolution, RESOLUTION2.resolution);

                        callback();
                    }
                );
            },
        // Create yet another resolution
            (callback) => {
                this._persistence.create(
                    null,
                    RESOLUTION3,
                    (err, resolution) => {
                        assert.isNull(err);

                        assert.isObject(resolution);
                        assert.equal(resolution.org_id, RESOLUTION3.org_id);
                        assert.sameMembers(resolution.rule_ids, RESOLUTION3.rule_ids);
                        assert.equal(resolution.resolution, RESOLUTION3.resolution);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let resolution1: ResolutionV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateResolutions(callback);
            },
        // Get all resolutions
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        resolution1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the resolution
            (callback) => {
                resolution1.resolution = 'Updated resolution 1';

                this._persistence.update(
                    null,
                    resolution1,
                    (err, resolution) => {
                        assert.isNull(err);

                        assert.isObject(resolution);
                        assert.equal(resolution.resolution, 'Updated resolution 1');
                        assert.equal(resolution.id, resolution1.id);

                        callback();
                    }
                );
            },
        // Delete resolution
            (callback) => {
                this._persistence.deleteById(
                    null,
                    resolution1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete resolution
            (callback) => {
                this._persistence.getOneById(
                    null,
                    resolution1.id,
                    (err, resolution) => {
                        assert.isNull(err);

                        assert.isNull(resolution || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create resolutions
            (callback) => {
                this.testCreateResolutions(callback);
            },
        // Get resolutions filtered by org_id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        org_id: '1'
                    }),
                    new PagingParams(),
                    (err, resolutions) => {
                        assert.isNull(err);

                        assert.isObject(resolutions);
                        assert.lengthOf(resolutions.data, 2);

                        callback();
                    }
                );
            },
        // Get resolutions by rule_id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        rule_id: '1'
                    }),
                    new PagingParams(),
                    (err, resolutions) => {
                        assert.isNull(err);

                        assert.isObject(resolutions);
                        assert.lengthOf(resolutions.data, 2);

                        callback();
                    }
                );
            },
        // Get resolutions filtered by search
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        search: '3'
                    }),
                    new PagingParams(),
                    (err, resolutions) => {
                        assert.isNull(err);

                        assert.isObject(resolutions);
                        assert.lengthOf(resolutions.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }

}
