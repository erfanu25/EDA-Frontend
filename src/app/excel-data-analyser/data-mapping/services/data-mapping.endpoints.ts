
const BaseUrl = "http://localhost:7071"

export const table_url: string = BaseUrl + "/api/getTableList";
export const mapper_name_url: string = BaseUrl + "/api/getMapperNames";
export const column_list_url: string = BaseUrl + "/api/getColumnList";
export const save_mapping_url: string = BaseUrl + "/api/saveMapper";
export const get_data_with_mapping: string = BaseUrl + "/api/getExcelDataAndMap";
export const get_excel_headers: string = BaseUrl + "/api/getExcelHeaders";