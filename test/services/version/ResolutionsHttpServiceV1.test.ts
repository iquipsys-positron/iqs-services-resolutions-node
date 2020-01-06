let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { ResolutionV1 } from '../../../src/data/version1/ResolutionV1';
import { ResolutionsMemoryPersistence } from '../../../src/persistence/ResolutionsMemoryPersistence';
import { ResolutionsController } from '../../../src/logic/ResolutionsController';
import { ResolutionsHttpServiceV1 } from '../../../src/services/version1/ResolutionsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('ResolutionsHttpServiceV1', ()=> {    
    let service: ResolutionsHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new ResolutionsMemoryPersistence();
        let controller = new ResolutionsController();

        service = new ResolutionsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-resolutions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-resolutions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-resolutions', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let resolution1, resolution2;

        async.series([
        // Create one resolution
            (callback) => {
                rest.post('/v1/resolutions/create_resolution',
                    {
                        resolution: RESOLUTION1
                    },
                    (err, req, res, resolution) => {
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
                rest.post('/v1/resolutions/create_resolution', 
                    {
                        resolution: RESOLUTION2
                    },
                    (err, req, res, resolution) => {
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
                rest.post('/v1/resolutions/get_resolutions',
                    {},
                    (err, req, res, page) => {
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

                rest.post('/v1/resolutions/update_resolution',
                    { 
                        resolution: resolution1
                    },
                    (err, req, res, resolution) => {
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
                rest.post('/v1/resolutions/delete_resolution_by_id',
                    {
                        resolution_id: resolution1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete resolution
            (callback) => {
                rest.post('/v1/resolutions/get_resolution_by_id',
                    {
                        resolution_id: resolution1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});