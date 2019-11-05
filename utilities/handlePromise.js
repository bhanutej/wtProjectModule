module.exports.handleUnautherizedExecption = (filedName) => {
    return [{
        field: filedName,
        message: `Unauthorized access of ${filedName}`
    }];
}

module.exports.handleErrors = (errors) => {
    let validationErrors = [];
    switch(errors.name) {
        case 'ValidationError':
            return [handleValidationErrors(errors.errors, validationErrors), 422];
        case 'CaseError':
            return [handleCastErrors(errors, validationErrors), 401];
        default:
            return validationErrors;
    }
}

handleValidationErrors = (validationFields, validationErrors) => {
    for(errorFields in validationFields) {
        const err = { field: validationFields[errorFields].path, message: validationFields[errorFields].message };
        validationErrors.push(err);
    }
    return validationErrors;
}

handleCastErrors = (validationFields, validationErrors) => {
    const modelName = validationFields.message.split("model")[1].replace(/\"/g, "");
    const err = { field: modelName, message: `Please provide valid ${modelName}` };
    validationErrors.push(err);
    return validationErrors;
}
