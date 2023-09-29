export const socketResponse =(success, message,payload=null) =>{
    return {
      success,
      message,
      payload
    }
  }