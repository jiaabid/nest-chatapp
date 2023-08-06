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
    }
}