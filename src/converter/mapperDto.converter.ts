import MapperDto from '../dto/mapper.dto';

class MapperDtoConverter {

    static mapperDtoConverter: MapperDtoConverter;

    public static getConverterInstance() {
        if (!this.mapperDtoConverter) {
            this.mapperDtoConverter = new MapperDtoConverter();
        }
        return this.mapperDtoConverter;
    }

    public convertToDto(mapperModel): MapperDto {
        const mapperDto = {
            _id: mapperModel["_id"].toString(),
            modelName: mapperModel["modelName"],
            mapperName: mapperModel["mapperName"],
            modelContent: mapperModel["modelContent"]
        };
        return mapperDto;
    }

}

export default MapperDtoConverter;