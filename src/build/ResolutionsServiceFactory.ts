import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ResolutionsMongoDbPersistence } from '../persistence/ResolutionsMongoDbPersistence';
import { ResolutionsFilePersistence } from '../persistence/ResolutionsFilePersistence';
import { ResolutionsMemoryPersistence } from '../persistence/ResolutionsMemoryPersistence';
import { ResolutionsController } from '../logic/ResolutionsController';
import { ResolutionsHttpServiceV1 } from '../services/version1/ResolutionsHttpServiceV1';

export class ResolutionsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-resolutions", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("iqs-services-resolutions", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("iqs-services-resolutions", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("iqs-services-resolutions", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-resolutions", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("iqs-services-resolutions", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(ResolutionsServiceFactory.MemoryPersistenceDescriptor, ResolutionsMemoryPersistence);
		this.registerAsType(ResolutionsServiceFactory.FilePersistenceDescriptor, ResolutionsFilePersistence);
		this.registerAsType(ResolutionsServiceFactory.MongoDbPersistenceDescriptor, ResolutionsMongoDbPersistence);
		this.registerAsType(ResolutionsServiceFactory.ControllerDescriptor, ResolutionsController);
		this.registerAsType(ResolutionsServiceFactory.HttpServiceDescriptor, ResolutionsHttpServiceV1);
	}
	
}
