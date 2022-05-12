
export interface Table {
    id: number;
    name: string;
    mapper: Mapper[];
}

export interface Mapper {
    id: number;
    name: string;
}

export interface TableMapper {
    tablePropertiesName: string;
    excelHeader: string;
}

export const employeeMapper: TableMapper[] = [
    { tablePropertiesName: 'empName', excelHeader: 'Name' },
    { tablePropertiesName: 'empAddress', excelHeader: 'Address' },
    { tablePropertiesName: 'empAge', excelHeader: 'Age' },
]

export const companyMapper: TableMapper[] = [
    { tablePropertiesName: 'companyName', excelHeader: 'Company Name' },
    { tablePropertiesName: 'companyAddress', excelHeader: 'Address' }
]

export const tableListData: Table[] = [
    { id: 1, name: 'Company', mapper: [{ id: 1, name: 'Company Mapper' }, { id: 2, name: 'Company Mapper 2' }] },
    { id: 2, name: 'Employee', mapper: [{ id: 3, name: 'Employee Mapper' }, { id: 4, name: 'New Employee Mapper' }] }
]

export const excelHeaders = [
    'Name',
    'Address',
    'Age',
    'Phone',
    'Status'
]

export const empTableProperties = [
    'empName',
    'empAddress',
    'designation',
    'empAge',
    'phone',
    'status'
]

export const companyTableProperties = [
    'CompanyName',
    'CompanyAddress',
    'phone',
    'business'
]