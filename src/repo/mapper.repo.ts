import { MapperModel } from './../model/Mapper.model';
import mongoose from 'mongoose';
import  { IMapper } from "../model/Mapper.model";

class MapperRepo {
    static mapperRep: MapperRepo;
    connString: string = "";
    private constructor() {
    }

    public static getRepoInstance() {
        if (!this.mapperRep) {
            this.mapperRep = new MapperRepo();
        }
        return this.mapperRep;
    }

    public async saveMapping(mapper): Promise<IMapper> {
        mapper.save();
        return mapper;
    }

    public async getMappers(): Promise<IMapper[]> {
      
        return null;
    }

    public async getMapperNames(searchParam): Promise<String[]> {
        const modelNames = await MapperModel.find(searchParam)
                .select({modelName : 1});
        return modelNames;
    }

    public async getTables(): Promise<String[]> {
       let collectionNames = [];
       await mongoose.connection.on('open', function (ref) {
            console.log('Connected to mongo server.');
            //trying to get collection names
            mongoose.connection.db.listCollections().toArray(function (err, names) {
                console.log(names); // [{ name: 'dbname.myCollection' }]
                collectionNames = names;
            });
        })

        return collectionNames;
      
    }


}

export default MapperRepo;