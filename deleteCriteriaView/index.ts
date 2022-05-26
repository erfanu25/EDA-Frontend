import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import CriteriaOperationService from "../src/dataAnalyzer/service/criteria.service";
import * as db from "../src/flex-max-cosmosdb-mongodb";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    let response = null;
    try {
        await db.init();
        response=await CriteriaOperationService.getServiceInstance().Delete(req.query.id);
        context.res = { status: 200, body: JSON.parse(JSON.stringify(response)) }; ;
      } catch (error) {
        context.res = { status: error.status, body: JSON.parse(JSON.stringify(error)) }; ;
      }

};

export default httpTrigger;