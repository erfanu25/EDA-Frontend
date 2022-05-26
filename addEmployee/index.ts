import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as db from "../src/flex-max-cosmosdb-mongodb";
import { EmployeeDto } from "../src/dataAnalyzer/dto/employee.dto";
import EmployeeOperationService from "../src/dataAnalyzer/service/employee.service";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let response = null;
    await db.init();
    response = {
        documentResponse: await EmployeeOperationService.getServiceInstance().Add(req.body),
      };
    context.res = response;
};

export default httpTrigger;
