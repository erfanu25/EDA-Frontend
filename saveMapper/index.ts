import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as db from "../lib/db-connector";
import MapperService from "../src/service/mapper.service";
import express, { Application } from 'express';
import cors from 'cors';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    console.log(req);
    try {
        let response = null;
        let mapperService: MapperService = MapperService.getServiceInstance();

        // create 1 db connection for all functions

        const app: Application = express();

        app.use(cors());

        await db.init();

        switch (req.method) {
            case "GET":
                console.log("Get Set");
                if (req?.query || (req?.body && req?.body?.id)) {
                    console.log("Get Set");
                    console.log(req.query);
                    response = {
                        documentResponse: await mapperService.getMapperNames(req.query)
                    };
                }
                break;

            case "POST":
                if (req?.body) {
                    console.log(req.body);
                    const insertOneResponse = await mapperService.saveMapping(req?.body);
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