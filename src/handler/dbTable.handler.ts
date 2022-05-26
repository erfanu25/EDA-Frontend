import MapperRepo from "../repo/mapper.repo";
import { IMapper } from "../model/Mapper.model";
import MapperDto from "../dto/mapper.dto";
import { MapperModel } from '../model/Mapper.model';
import * as fs from 'fs';
import DbTableDto from "../dto/dbTable.dto";


class DbTableHandler {
    static isSignIn: boolean;
    static dbTableHandler: DbTableHandler;
    mapperRepo: MapperRepo = MapperRepo.getRepoInstance();
    tables: string[] = ["Employee"];

    constructor() {
    }

    public static getHandlerInstance() {
        if (!this.dbTableHandler) {
            this.dbTableHandler = new DbTableHandler();
            return this.dbTableHandler;
        }
        return this.dbTableHandler;
    }


    public async getTables(): Promise<DbTableDto[]> {
        return JSON.parse(fs.readFileSync("tables.json", "utf8"));
    }

    public async getTableColumns(collectionName): Promise<String[]> {
        return this.mapperRepo.getTableColumns(collectionName);
    }

    public async getTableColumnsWithTypes(collectionName): Promise<any> {
        return this.mapperRepo.getTableColumnsWithTypes(collectionName);
    }
    

}



export default DbTableHandler;