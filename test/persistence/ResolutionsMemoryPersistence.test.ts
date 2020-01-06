import { ConfigParams } from 'pip-services3-commons-node';

import { ResolutionsMemoryPersistence } from '../../src/persistence/ResolutionsMemoryPersistence';
import { ResolutionsPersistenceFixture } from './ResolutionsPersistenceFixture';

suite('ResolutionsMemoryPersistence', ()=> {
    let persistence: ResolutionsMemoryPersistence;
    let fixture: ResolutionsPersistenceFixture;
    
    setup((done) => {
        persistence = new ResolutionsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new ResolutionsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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