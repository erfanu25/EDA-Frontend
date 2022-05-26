import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as db from "../lib/db-connector";
import FileContentService from "../src/service/fileContent.service";
import MapperService from "../src/service/mapper.service";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    console.log(req);
    try {
        let response = null;
        let mapperService: MapperService = MapperService.getServiceInstance();
        let fileContentService: FileContentService = FileContentService.getServiceInstance();

        // create 1 db connection for all functions

        await db.init();

        switch (req.method) {

            case "POST":
                if (req?.body) {
                    const fileId = req.body.fileId;
                    const insertOneResponse = await mapperService.saveMapping(req?.body);
                    console.log(fileId);
                    console.log("insert one response");
                    console.log(insertOneResponse);
                    const mappingId = insertOneResponse["_id"].toString()
                    fileContentService.updateMappingForFile(fileId, mappingId);
                    fileContentService.updateFileStatusWithMappedStatus(fileId);
                    response = {
                        mapResponse: insertOneResponse,
                    };
                } else {
                    throw Error("No document found");
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