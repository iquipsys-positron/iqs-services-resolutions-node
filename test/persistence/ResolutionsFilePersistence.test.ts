import { ConfigParams } from 'pip-services3-commons-node';

import { ResolutionsFilePersistence } from '../../src/persistence/ResolutionsFilePersistence';
import { ResolutionsPersistenceFixture } from './ResolutionsPersistenceFixture';

suite('ResolutionsFilePersistence', ()=> {
    let persistence: ResolutionsFilePersistence;
    let fixture: ResolutionsPersistenceFixture;
    
    setup((done) => {
        persistence = new ResolutionsFilePersistence('./data/resolutions.test.json');

        fixture = new ResolutionsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});