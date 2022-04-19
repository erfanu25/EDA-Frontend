import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import FileContentService from "../src/service/fileContent.service";
import * as db from "../src/flex-max-cosmosdb-mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let response = null;
    let fileContentService:FileContentService = FileContentService.getServiceInstance();
    // create 1 db connection for all functions
    await db.init();
    response = {
        documentResponse: await fileContentService.getList(),
      };
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
    };
};

export default httpTrigger;