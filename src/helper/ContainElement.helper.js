function containsModule(modules,moduleName) {
    return modules.some(module => module.MODULE_NAME === moduleName);
}

function containFunction(funcs,functionName){
    return funcs.some(func => func.FUNCTION_NAME === functionName)
}

module.exports = {
    containsModule,
    containFunction
}