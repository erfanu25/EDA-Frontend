export let TableType = [

  { label: 'Employee', value: 'EMPLOYEE' },
  { label: 'Company', value: 'COMPANY' }
];

export let TextCriteria = [

  { label: 'Starts with', value: 'Starts with' },
  { label: 'Contains', value: 'Contains' }  ,
  { label: 'Not contains', value: 'Not contains' },
  { label: 'Ends with', value: 'Ends with' } ,
  { label: 'Equals', value: 'Equals' },
  { label: 'Not equals', value: 'Not equals' }
];

export let DateCriteria = [

  { label: 'Date is', value: 'Date is' },
  { label: 'Date is NOT', value: 'Date is NOT' }  ,
  { label: 'Date is BEFORE', value: 'Date is BEFORE' },
  { label: 'Date is AFTER', value: 'Date is AFTER' }
];

export let NumberCriteria = [

  { label: 'Equals', value: 'Equals' },
  { label: 'Not Equals', value: 'Not Equals' } ,
  { label: 'Less than or equal to', value: 'Less than or equal to' },
  { label: 'Greater than', value: 'Greater than' },
  { label: 'Greater than or equal to', value: 'Greater than or equal to' },
];


export interface EmpDetails {
  name: string;
  age: number;
  address: string;


}
