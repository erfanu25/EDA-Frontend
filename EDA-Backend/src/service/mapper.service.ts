import MapperHandler from "../handler/mapping.handler";
import { IMapper } from "../model/Mapper.model";
import MapperDto from "../dto/mapper.dto";
import DbTableHandler from "../handler/dbTable.handler";
import ExcelDataHandler from "../handler/excel-data.handler";
import DbTableDto from "../dto/dbTable.dto";
import FileContentHandler from "../handler/fileContent.handler";


class MapperService {
    private static mapperService: MapperService;
    private mappingHandler: MapperHandler = MapperHandler.getHandlerInstance();
    private fileContentHandler: FileContentHandler = FileContentHandler.getHandlerInstance();
    private dbTable: DbTableHandler = DbTableHandler.getHandlerInstance();
    private excelDataHandler: ExcelDataHandler = ExcelDataHandler.getHandlerInstance();

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
    public async getTableColumnsWithTypes(collectionName): Promise<any> {
        return this.dbTable.getTableColumnsWithTypes(collectionName);
    }
    

    public async getTables(): Promise<DbTableDto[]> {
        return this.dbTable.getTables();
    }


    public async saveMapping(mappingBody): Promise<MapperDto> {
        return this.mappingHandler.saveMapping(mappingBody);
    }

    public async getMapperNames(searchParams): Promise<MapperNameDto[]> {
        return this.mappingHandler.getMapperNames(searchParams);
    }

    public async getMappedExcelData(modelContent, filePath): Promise<String[]> {
        return this.excelDataHandler.getMappedExcelData(modelContent, filePath);
    }

    public async getExcelHeaders(fileId): Promise<String[]> {
        const fileContent = await this.fileContentHandler.getFileContentById(fileId);
        console.log("FIle Content");
        console.log(fileContent);
        return this.excelDataHandler.getExcelHeaders(fileContent["name"]);
    }

    public async getMapper(searchParam): Promise<MapperDto> {
        return this.mappingHandler.getMapper(searchParam);
    }

    public async updateMapper(mapper): Promise<MapperDto> {
        return this.mappingHandler.updateMapper(mapper);
    }
}

export default MapperService;