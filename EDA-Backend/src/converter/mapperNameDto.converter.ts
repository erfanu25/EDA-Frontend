import { MapperModel, IMapper } from '../model/Mapper.model';



class MapperNameDtoConverter {

    static mapperDtoConverter: MapperNameDtoConverter;

    public static getConverterInstance() {
        if (!this.mapperDtoConverter) {
            this.mapperDtoConverter = new MapperNameDtoConverter();
        }
        return this.mapperDtoConverter;
    }

    public convertToDto(mapperModel): MapperNameDto {
        const mapperDto = {
            _id: mapperModel["_id"].toString(),
            mapperName: mapperModel["mapperName"]
        };
        return mapperDto;
    }

    public convertToDtoList(mappers): MapperNameDto[] {
        let mapperList: MapperNameDto[] = [];
        mappers.forEach(mapper => {
            mapperList.push(this.convertToDto(mapper));
        });
        return mapperList;
    }

}

export default MapperNameDtoConverter;