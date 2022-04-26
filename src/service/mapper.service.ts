import MapperHandler from "../handler/mapping.handler";
import { IMapper } from "../model/Mapper.model";
import  MapperDto  from "../dto/mapper.dto";
import ExcelDataHandler from "../handler/excel-data.handler";


class MapperService {
    private static mapperService: MapperService;
    private mappingHandler:MapperHandler = MapperHandler.getHandlerInstance();
    private excelDataHandler: ExcelDataHandler = ExcelDataHandler.getHandlerInstance();
    private constructor() {
    }

    public static getServiceInstance() {
        if (!this.mapperService) {
            this.mapperService = new MapperService();
        }
        return this.mapperService;
    }

    public async getTables(): Promise<String[]> {
        return this.mappingHandler.getTables();
        //return await this.mappingHandler.getTables();
    }

    public async saveMapping(mappingBody): Promise<MapperDto> {
        return this.mappingHandler.saveMapping(mappingBody);
    }

    public async getMapperNames(searchParams): Promise<String[]> {
        return this.mappingHandler.getMapperNames(searchParams);
    }

    public async getMappedExcelData(modelContent): Promise<String[]> {
        return this.excelDataHandler.getMappedExcelData(modelContent);
    }
    
    public async getExcelHeaders(fileId): Promise<String[]> {
        return this.excelDataHandler.getExcelHeaders(fileId);
    }
}

export default MapperService;