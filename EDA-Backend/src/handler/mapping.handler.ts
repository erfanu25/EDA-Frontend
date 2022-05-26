import MapperRepo from "../repo/mapper.repo";
import { IMapper } from "../model/Mapper.model";
import MapperDto from "../dto/mapper.dto";
import { MapperModel } from '../model/Mapper.model';
import MapperNameDtoConverter from "../converter/mapperNameDto.converter";
import MapperDtoConverter from "../converter/mapperDto.converter";



class MapperHandler {
    static isSignIn: boolean;
    static mapperHandler: MapperHandler;
    mapperNameDtoConverter: MapperNameDtoConverter = MapperNameDtoConverter.getConverterInstance();
    mapperDtoConverter: MapperDtoConverter = MapperDtoConverter.getConverterInstance();
    mapperRepo: MapperRepo = MapperRepo.getRepoInstance()

    constructor() {
    }

    public static getHandlerInstance() {
        if (!this.mapperHandler) {
            this.mapperHandler = new MapperHandler();
            return this.mapperHandler;
        }
        return this.mapperHandler;
    }


    public async saveMapping(mapperDto: MapperDto): Promise<MapperDto> {
        const mapper = new MapperModel({
            "modelName": mapperDto["modelName"],
            "tableName" : mapperDto["tableName"],
            "mapperName": mapperDto["mapperName"],
            "modelContent": mapperDto["modelContent"]
        });
        return this.mapperRepo.saveMapping(mapper);

    }

    public async getMapper(searchParam): Promise<MapperDto> {
        return this.mapperRepo.getMapper(searchParam);
    }

    public async getMapperNames(searchParams): Promise<MapperNameDto[]> {
        const mappers = await this.mapperRepo.getMapperNames(searchParams);
        return this.mapperNameDtoConverter.convertToDtoList(mappers);
    }


    public async updateMapper(mapper): Promise<MapperDto> {
        try {
            let savedMapper = await this.mapperRepo.updateMapper(mapper);
            return this.mapperDtoConverter.convertToDto(savedMapper);
        } catch (e) {
            console.log(e);
        }

    }

}



export default MapperHandler;