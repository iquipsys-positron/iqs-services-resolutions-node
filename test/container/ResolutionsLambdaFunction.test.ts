let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { ResolutionV1 } from '../../src/data/version1/ResolutionV1';
import { ResolutionsMemoryPersistence } from '../../src/persistence/ResolutionsMemoryPersistence';
import { ResolutionsController } from '../../src/logic/ResolutionsController';
import { ResolutionsLambdaFunction } from '../../src/container/ResolutionsLambdaFunction';

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

suite('ResolutionsLambdaFunction', ()=> {
    let lambda: ResolutionsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'iqs-services-resolutions:persistence:memory:default:1.0',
            'controller.descriptor', 'iqs-services-resolutions:controller:default:default:1.0'
        );

        lambda = new ResolutionsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var resolution1, resolution2;

        async.series([
        // Create one resolution
            (callback) => {
                lambda.act(
                    {
                        role: 'resolutions',
                        cmd: 'create_resolution',
                        resolution: RESOLUTION1
                    },
                    (err, resolution) => {
                        assert.isNull(err);

                        assert.isObject(resolution);
                        assert.equal(resolution.org_id, RESOLUTION1.org_id);
                        assert.sameMembers(resolution.rule_ids, RESOLUTION1.rule_ids);
                        assert.equal(resolution.resolution, RESOLUTION1.resolution);

                        resolution1 = resolution;

                        callback();
                    }
                );
            },
        // Create another resolution
            (callback) => {
                lambda.act(
                    {
                        role: 'resolutions',
                        cmd: 'create_resolution',
                        resolution: RESOLUTION2
                    },
                    (err, resolution) => {
                        assert.isNull(err);

                        assert.isObject(resolution);
                        assert.equal(resolution.org_id, RESOLUTION2.org_id);
                        assert.sameMembers(resolution.rule_ids, RESOLUTION2.rule_ids);
                        assert.equal(resolution.resolution, RESOLUTION2.resolution);

                        resolution2 = resolution;

                        callback();
                    }
                );
            },
        // Get all resolutions
            (callback) => {
                lambda.act(
                    {
                        role: 'resolutions',
                        cmd: 'get_resolutions' 
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the resolution
            (callback) => {
                resolution1.resolution = 'Updated resolution 1';

                lambda.act(
                    {
                        role: 'resolutions',
                        cmd: 'update_resolution',
                        resolution: resolution1
                    },
                    (err, resolution) => {
                        assert.isNull(err);

                        assert.isObject(resolution);
                        assert.equal(resolution.resolution, 'Updated resolution 1');
                        assert.equal(resolution.org_id, RESOLUTION1.org_id);

                        resolution1 = resolution;

                        callback();
                    }
                );
            },
        // Delete resolution
            (callback) => {
                lambda.act(
                    {
                        role: 'resolutions',
                        cmd: 'delete_resolution_by_id',
                        resolution_id: resolution1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete resolution
            (callback) => {
                lambda.act(
                    {
                        role: 'resolutions',
                        cmd: 'get_resolution_by_id',
                        resolution_id: resolution1.id
                    },
                    (err, resolution) => {
                        assert.isNull(err);

                        assert.isNull(resolution || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});