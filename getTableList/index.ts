import express, { Application } from 'express';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as db from "../lib/db-connector";
import MapperService from "../src/service/mapper.service";
import cors from 'cors';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        let response = null;
        let mapperService: MapperService = MapperService.getServiceInstance();

        // create 1 db connection for all functions
        const app: Application = express();

        app.use(cors());

        await db.init();

        switch (req.method) {
            case "GET":
                response = await mapperService.getTables();
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