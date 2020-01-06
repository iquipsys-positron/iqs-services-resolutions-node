let ResolutionsProcess = require('../obj/src/container/ResolutionsProcess').ResolutionsProcess;

try {
    new ResolutionsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
