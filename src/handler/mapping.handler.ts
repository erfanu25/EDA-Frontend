import MapperRepo from "../repo/mapper.repo";
import { IMapper } from "../model/Mapper.model";
import MapperDto from "../dto/mapper.dto";
import { MapperModel } from './../model/Mapper.model';
import MapperNameDtoConverter from "../converter/mapperNameDto.converter";



class MapperHandler {
    static isSignIn: boolean;
    static mapperHandler: MapperHandler;
    mapperNameDtoConverter: MapperNameDtoConverter = MapperNameDtoConverter.getConverterInstance();
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
        try {
            const mapper = new MapperModel({
                "modelName": mapperDto["modelName"],
                "mapperName": mapperDto["mapperName"],
                "modelContent": mapperDto["modelContent"]
            });
            return this.mapperRepo.saveMapping(mapper);
        } catch (e) {
            console.log(e);
        }
    }

    public async getMapper(searchParam): Promise<MapperDto> {
        return this.mapperRepo.getMapper(searchParam);
    }

    public async getMapperNames(searchParams): Promise<MapperNameDto[]> {
        let mapperList = []
        const mappers = await this.mapperRepo.getMapperNames(searchParams);
        mappers.forEach(mapper => {
            mapperList.push(this.mapperNameDtoConverter.convertToDto(mapper));
        });
        return mapperList;
    }

}



export default MapperHandler;