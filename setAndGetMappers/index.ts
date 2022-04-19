import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as db from "../lib/db-connector";
import MapperService from "../src/service/mapper.service";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        let response = null;
        let mapperService:MapperService = MapperService.getServiceInstance();
    
        // create 1 db connection for all functions
        await db.init();
    
        switch (req.method) {
          case "GET":
            if (req?.query || (req?.body && req?.body?.id)) {
              console.log(req.query);
              console.log("testing.....")
              response = {
                documentResponse: await mapperService.getMapperNames(req.query)
              };
            } else {
              // allows empty query to return all items
              const dbQuery =
                req?.query?.dbQuery || (req?.body && req?.body?.dbQuery);
              console.log(process.env["CosmosDbConnectionString"]);
              response = {
               documentResponse: await mapperService.getTables(),
              };
            }
            break;

          case "POST":
            if (req?.body) {
              const insertOneResponse = await mapperService.saveMapping(req?.body);
              response = {
                mapResponse: insertOneResponse,
              };
            } else {
              throw Error("No document found");
            }
    
            break;

            
          case "DELETE":
            if (req?.query?.id || (req?.body && req?.body?.id)) {
              response = {
               // documentResponse: await db.deleteItemById(req?.body?.id),
              };
            } else {
              throw Error("No id found");
            }
    
            break;
          default:
            throw Error(`${req.method} not allowed`)
        }
    
        context.res = {
          body: response,
        };
      } catch (err) {
        context.log(`*** Error throw: ${JSON.stringify(err)}`);
    
        context.res = {
          status: 500,
          body: err,
        };
      }

};

export default httpTrigger;