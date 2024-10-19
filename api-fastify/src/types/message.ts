export type ReturnMessage = {
  success: boolean
  message: string
  data: any
  error_detail?: any
}

export enum EnumMessage {
  CREATE_SUCCESS = "Create data success",
  UPDATE_SUCCESS = "Update data success",
  REMOVE_SUCCESS = "Remove data success",
  GET_SUCCESS = "Get data success",
  CREATE_FAILED = "Create data failed!",
  UPDATE_FAILED = "Update data failed!",
  REMOVE_FAILED = "Remove data failed!",
  GET_FAILED = "Get data failed!",
}
