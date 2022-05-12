
 
export interface SearchCriteria {
    column: string;
    operator: string;
    value: string;
}

// select name,age,address,salary from employee where month=3 and salary>5000

// month=3&salary>5000

// [
// 	{
// 		"column":"month",
// 		"operator":"eq",
// 		"value":3,
	
// 	},
// 	{
// 		"column":"salary",
// 		"operator":"gt",
// 		"value":5000
	
// 	}
// ]



// CriteriaName:"ABC"
// Content:JsonObject


