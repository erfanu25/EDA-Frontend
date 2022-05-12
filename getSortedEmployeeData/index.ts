import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import EmployeeOperationService from "../src/dataAnalyzer/service/employee.service";
import * as db from "../src/flex-max-cosmosdb-mongodb";

const getSortedEmployeeData: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let response = null;
    try {
        await db.init();
        let total=await EmployeeOperationService.getServiceInstance()
        .CountEmployees();
        var body=req.body;
        response=await EmployeeOperationService.getServiceInstance().GetSortedList(req.query.sortBy,req.query.sortType,req.query.pageSize,req.query.pageIndex,body);
        context.res = { status: 200, body: {total:total,data:response} }; ;
      } catch (error) {
        context.res = { status: error.status, body: JSON.parse(JSON.stringify(error)) }; ;
      }

};

export default getSortedEmployeeData;