import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as db from "../src/flex-max-cosmosdb-mongodb";
import CompanyOperationService from "../src/dataAnalyzer/service/company.service";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let response = null;
//     var company: ICompanyDtoDto = {
//       name: "atique",
//        email:"atique.ict@gmail.com",
//       age: 36,
//         salary: 40000
//   };
    await db.init();
    response = {
        documentResponse: await CompanyOperationService.getServiceInstance().Add(req.body),
      };
    context.res = response;
};

export default httpTrigger;