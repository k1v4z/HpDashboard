function containsModule(modules,moduleName) {
    return modules.some(module => module.MODULE_NAME === moduleName);
}

module.exports = {
    containsModule
}