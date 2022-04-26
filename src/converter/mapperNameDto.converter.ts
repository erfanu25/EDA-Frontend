import { MapperModel, IMapper } from './../model/Mapper.model';



class MapperNameDtoConverter {

    static mapperDtoConverter: MapperNameDtoConverter;

    public static getConverterInstance() {
        if (!this.mapperDtoConverter) {
            this.mapperDtoConverter = new MapperNameDtoConverter();
        }
        return this.mapperDtoConverter;
    }

    public convertToDto(mapperModel): MapperNameDto {
        console.log("To string");
        console.log(mapperModel["_id"].toString());
        const mapperDto = {
            _id: mapperModel["_id"].toString(),
            mapperName: mapperModel["mapperName"]
        };
        return mapperDto;
    }

}

export default MapperNameDtoConverter;