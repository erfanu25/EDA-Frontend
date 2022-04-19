import MapperRepo from "../repo/mapper.repo";
import  { IMapper } from "../model/Mapper.model";
import  MapperDto  from "../dto/mapper.dto";
import { MapperModel } from './../model/Mapper.model';



class MapperHandler {
    static isSignIn: boolean;
    static mapperHandler: MapperHandler;
    mapperRepo:MapperRepo=MapperRepo.getRepoInstance()

    constructor() {
    }

    public static getHandlerInstance() {
        if (!this.mapperHandler) {
            this.mapperHandler = new MapperHandler();
            return this.mapperHandler;
        }
        return this.mapperHandler;
    }

    
    public async saveMapping(mapperDto:MapperDto): Promise<MapperDto> {
        const mapper = new MapperModel({
            "modelName" : mapperDto["modelName"],
            "mapperName" : mapperDto["mapperName"],
            "modelContent" : mapperDto["modelContent"]
        });
        return this.mapperRepo.saveMapping(mapper);
    }

    public async getMappers(): Promise<IMapper[]> {
      
        return null;
    }

    public async getMapperNames(searchParams): Promise<String[]> {
        return this.mapperRepo.getMapperNames(searchParams);
    }

    
    public async getTables(): Promise<String[]> {
        return this.mapperRepo.getTables();
    }



}

  

export default MapperHandler;