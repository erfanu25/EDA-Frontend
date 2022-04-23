import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CriteriaViewDto } from "../src/dataAnalyzer/dto/criteriaView.dto";
import CriteriaOperationService from "../src/dataAnalyzer/service/criteria.service";
import * as db from "../src/flex-max-cosmosdb-mongodb";

const SaveCriteria: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let response = null;
    try {
        var criteria: CriteriaViewDto = {
            name: req.body.name,
            content: req.body.content,
        };
        await db.init();
        response = {
            Result: await CriteriaOperationService.getServiceInstance().Add(criteria),
        };
        context.res = { status: 200, body: JSON.parse(JSON.stringify(response)) }; ;
      } catch (error) {
        context.res = { status: error.status, body: JSON.parse(JSON.stringify(error)) }; ;
      }

};

export default SaveCriteria;