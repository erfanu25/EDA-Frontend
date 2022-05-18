export let TableType = [

  { label: 'Employee', value: 'EMPLOYEE' },
  { label: 'Company', value: 'COMPANY' }
];

export let TextCriteria = [

  { label: 'Starts with', value: 'Starts_with' },
  { label: 'Contains', value: 'Contains' }  ,
  { label: 'Not contains', value: 'Not_contains' },
  { label: 'Ends with', value: 'Ends_with' } ,
  { label: 'Equals', value: 'Equals' },
  { label: 'Not equals', value: 'Not_equals' }
];

export let DateCriteria = [

  { label: 'Date is', value: 'Date_is' },
  // { label: 'Date is NOT', value: 'Date_is_NOT' }  ,
  { label: 'Date is BEFORE', value: 'Date_is_BEFORE' },
  { label: 'Date is AFTER', value: 'Date_is_AFTER' }
];

export let NumberCriteria = [
  { label: 'Equals', value: 'Equals' },
  { label: 'Range', value: 'Number_Range' },
  { label: 'Not Equals', value: 'Not_Equals' } ,
  { label: 'Less than or equal to', value: 'Less_than_or_equal_to' },
  { label: 'Greater than', value: 'Greater_than' },
  { label: 'Greater than or equal to', value: 'Greater_than_or_equal_to' },
];


export interface EmpDetails {
  name: string;
  email: string;
  salary: number;
  age: number;





}
