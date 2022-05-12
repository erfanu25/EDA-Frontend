import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import EmployeeOperationService from "../src/dataAnalyzer/service/employee.service";
import * as db from "../src/flex-max-cosmosdb-mongodb";

const getSearchedEmployeeData: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let response = null;
    try {
        await db.init();
        let total=await EmployeeOperationService.getServiceInstance()
        .CountEmployees();
        response=await EmployeeOperationService.getServiceInstance()
        .GetSearchedEmployeeList(req.query.minRange,req.query.maxRange,req.query.searchedText);
        context.res = { status: 200, body: {data:response} }; ;
      } catch (error) {
        context.res = { status: error.status, body: JSON.parse(JSON.stringify(error)) }; ;
      }

};

export default getSearchedEmployeeData;