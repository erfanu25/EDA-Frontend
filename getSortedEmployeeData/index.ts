import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import EmployeeOperationService from "../src/dataAnalyzer/service/employee.service";
import * as db from "../src/flex-max-cosmosdb-mongodb";

const getSortedEmployeeData: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let response = null;
    try {
        await db.init();
        response=await EmployeeOperationService.getServiceInstance().GetSortedList(req.query.column,req.query.value);
        context.res = { status: 200, body: response }; ;
      } catch (error) {
        context.res = { status: error.status, body: JSON.parse(JSON.stringify(error)) }; ;
      }

};

export default getSortedEmployeeData;