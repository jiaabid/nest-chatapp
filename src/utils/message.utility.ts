export const generateMessage = (resource:string)=>{
    return {
        CREATED: `${resource} created successfully!`,
        RETRIEVE: `${resource} retrieved successfully!`,
        RETRIEVEALL: `${resource}s retrieved successfully!`,
        UPDATED: `${resource} updated successfully!`,
        DELETED: `${resource} deleted successfully!`,
        NOTFOUND: `${resource} not found!`,
        EXIST: `This ${resource} already exists!`,
        BADREQUEST: `Bad Request!`,
        INVALID_PASSWORD:`Invalid Password`,
        IS_DISABLED:`User is disabled. Contact Admin for verification.`,
        INVALID_CREATOR:`You are not allowed to create this user!.`,
        LOGIN:`${resource} logged in successfully!`
    }
}

export const roleEnums = {
    MANAGER:'manager',
    ADMIN:'admin',
    CR:'customer representative'
}