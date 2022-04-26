import MapperRepo from "../repo/mapper.repo";
import  { IMapper } from "../model/Mapper.model";
import  MapperDto  from "../dto/mapper.dto";
import { MapperModel } from '../model/Mapper.model';



class DbTableHandler {
    static isSignIn: boolean;
    static dbTableHandler: DbTableHandler;
    mapperRepo:MapperRepo=MapperRepo.getRepoInstance()

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
        return this.mapperRepo.getTables();
    }

    public async getTableColumns(collectionName): Promise<String[]> {
        return this.mapperRepo.getTableColumns(collectionName);
    }



}

  

export default DbTableHandler;