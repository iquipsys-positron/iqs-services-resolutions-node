"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const ResolutionsMongoDbPersistence_1 = require("../persistence/ResolutionsMongoDbPersistence");
const ResolutionsFilePersistence_1 = require("../persistence/ResolutionsFilePersistence");
const ResolutionsMemoryPersistence_1 = require("../persistence/ResolutionsMemoryPersistence");
const ResolutionsController_1 = require("../logic/ResolutionsController");
const ResolutionsHttpServiceV1_1 = require("../services/version1/ResolutionsHttpServiceV1");
class ResolutionsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(ResolutionsServiceFactory.MemoryPersistenceDescriptor, ResolutionsMemoryPersistence_1.ResolutionsMemoryPersistence);
        this.registerAsType(ResolutionsServiceFactory.FilePersistenceDescriptor, ResolutionsFilePersistence_1.ResolutionsFilePersistence);
        this.registerAsType(ResolutionsServiceFactory.MongoDbPersistenceDescriptor, ResolutionsMongoDbPersistence_1.ResolutionsMongoDbPersistence);
        this.registerAsType(ResolutionsServiceFactory.ControllerDescriptor, ResolutionsController_1.ResolutionsController);
        this.registerAsType(ResolutionsServiceFactory.HttpServiceDescriptor, ResolutionsHttpServiceV1_1.ResolutionsHttpServiceV1);
    }
}
exports.ResolutionsServiceFactory = ResolutionsServiceFactory;
ResolutionsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-resolutions", "factory", "default", "default", "1.0");
ResolutionsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-resolutions", "persistence", "memory", "*", "1.0");
ResolutionsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-resolutions", "persistence", "file", "*", "1.0");
ResolutionsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-resolutions", "persistence", "mongodb", "*", "1.0");
ResolutionsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-resolutions", "controller", "default", "*", "1.0");
ResolutionsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-resolutions", "service", "http", "*", "1.0");
//# sourceMappingURL=ResolutionsServiceFactory.js.map