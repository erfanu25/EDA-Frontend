import MapperRepo from "../repo/mapper.repo";
import { IMapper } from "../model/Mapper.model";
import MapperDto from "../dto/mapper.dto";
import { MapperModel } from '../model/Mapper.model';
import * as fs from 'fs';




class DbTableHandler {
    static isSignIn: boolean;
    static dbTableHandler: DbTableHandler;
    mapperRepo: MapperRepo = MapperRepo.getRepoInstance();
    tables: string[] = ["Employee","Company","Mapper", "FileContent", "status"];

    constructor() {
    }

    public static getHandlerInstance() {
        if (!this.dbTableHandler) {
            this.dbTableHandler = new DbTableHandler();
            return this.dbTableHandler;
        }
        return this.dbTableHandler;
    }


    public async getTables(): Promise<String[]> {
        // fs.readFile("./table-list","utf-8",)
        //return this.mapperRepo.getTables();

        return this.tables;
    }

    public async getTableColumns(collectionName): Promise<String[]> {
        return this.mapperRepo.getTableColumns(collectionName);
    }



}



export default DbTableHandler;