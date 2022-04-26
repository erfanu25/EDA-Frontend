import MapperHandler from "../handler/mapping.handler";
import { IMapper } from "../model/Mapper.model";
import  MapperDto  from "../dto/mapper.dto";
import DbTableHandler from "../handler/dbTable.handler";


class MapperService {
    private static mapperService: MapperService;
    private mappingHandler:MapperHandler = MapperHandler.getHandlerInstance();
    private dbTable:DbTableHandler = DbTableHandler.getHandlerInstance();
    
    private constructor() {
    }

    public static getServiceInstance() {
        if (!this.mapperService) {
            this.mapperService = new MapperService();
        }
        return this.mapperService;
    }

    public async getTableColumns(collectionName): Promise<String[]> {
        return this.dbTable.getTableColumns(collectionName);
    }

    public async getTables(): Promise<String[]> {
        return this.dbTable.getTables();
    }


    public async saveMapping(mappingBody): Promise<MapperDto> {
        return this.mappingHandler.saveMapping(mappingBody);
    }

    public async getMapperNames(searchParams): Promise<MapperNameDto[]> {
        return this.mappingHandler.getMapperNames(searchParams);
    }
    
}

export default MapperService;