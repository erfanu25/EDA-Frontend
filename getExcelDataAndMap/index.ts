import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import MapperService from "../src/service/mapper.service";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('getMappedExcelData function processed a request.');

    try {
        let response = null;
        let mapperService:MapperService = MapperService.getServiceInstance();

        switch (req.method) {
          case "POST":
            if (req?.body) {
              response = {
                documentResponse: await mapperService.getMappedExcelData(req?.body)
              };
            } else {
              throw Error("No document found");
            }

            break;
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