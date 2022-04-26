import { MapperModel } from './../model/Mapper.model';
import mongoose from 'mongoose';
import { IMapper } from "../model/Mapper.model";

const mongo = require("mongoose");


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
        await mongoose.connect("mongodb://localhost/test");
        mapper.save();
        return mapper;
    }

    public async getMappers(): Promise<IMapper[]> {

        return null;
    }

    public async getMapperNames(searchParam): Promise<any> {
        const modelNames = await MapperModel.find(searchParam)
            .select({ mapperName: 1, _id: 1 });
        const customMap = { _id: "customId", mapperName: "Custom_Mapping" }
        modelNames.unshift(customMap);
        return modelNames;
    } l̥

    public getTables(): Promise<String[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let collectionNames = [];
                const connection = await mongoose.connect("mongodb://localhost/test");
                mongoose.connection.db.listCollections().toArray(function (err, tables) {
                    tables.forEach(element => {
                        collectionNames.push(element["name"]);
                    });
                    mongoose.connection.close();
                    resolve(collectionNames);
                });
            } catch (e) {
                reject(e);
            }

        })
    }


    public getTableColumns(collectionName): Promise<String[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let fieldNames = [];
                const connection = await mongoose.connect("mongodb://localhost/test");
                const schema = mongoose.model("Employee").schema;

                Object.entries(schema.paths)
                    .filter(([key, value]) => key != "__v" && key != "_id")
                    .forEach(([key, value]) => fieldNames.push(key));


                // var SongSchema = mongoose.model(collectionName).schema;
                //console.log(SongSchema);


                resolve(fieldNames);
            } catch (e) {
                console.log(e);
                reject(e);
            }

        })
    }

    // public async getTables(): Promise<String[]> {
    //     let collectionNames = [];
    //     //const connection = await mongoose.connect(process.env["CosmosDbConnectionString"]);
    //     const connection =  await mongoose.connect("mongodb://localhost/test");
    //     const dbConnection = await mongoose.connection;
    //  //   dbConnection.on('open',  function () {
    //     await dbConnection.db.listCollections().toArray(async function (err, tables) {
    //            await tables.forEach(element => {
    //                 collectionNames.push(element["name"]);
    //             });
    //            await console.log(collectionNames);

    //             dbConnection.close();
    //         });
    //  //   });
    //  console.log("tt " + collectionNames);
    //     return collectionNames;

    // }


}

export default MapperRepo;