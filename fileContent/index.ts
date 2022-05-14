import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import FileContentService from "../src/service/fileContent.service";
import * as db from "../src/flex-max-cosmosdb-mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let response = null;
    const page : any = req.query.page;
    const size : any = req.query.size;
    let fileContentService:FileContentService = FileContentService.getServiceInstance();
    // create 1 db connection for all functions
    await db.init();
    switch (req.method) {
        case "GET":
            response = await fileContentService.getList(page,size)
          break;
        case "POST":
          response  =  {documentResponse: await fileContentService.create(req?.body)}
          break;
        default:
          throw Error(`${req.method} not allowed`)
      }
        // response = await fileContentService.getList(page,size) 
        //documentResponse: await repo.createStatus(req?.body?.document),
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
    };
};

export default httpTrigger;