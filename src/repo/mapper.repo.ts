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


    public async saveMapping(mapper): Promise<any> {
        return await mapper.save();
    }

    public async getMapper(searchParam): Promise<any> {
        return await MapperModel.findById(searchParam._id);
    }

    public async getMapperNames(searchParam): Promise<any> {
        const modelNames = await MapperModel.find(searchParam)
            .select({ mapperName: 1, _id: 1 });
        const customMap = { _id: "customId", mapperName: "Custom_Mapping" }
        modelNames.unshift(customMap);
        return modelNames;
    }

    public async updateMapper(mapper): Promise<any> {
        const modelMapper = await MapperModel.findById(mapper["_id"]);
        modelMapper["modelContent"] = mapper["modelContent"]
        return await modelMapper.save();

    }

    public getTables(): Promise<String[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let collectionNames = [];
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
                const schema = mongoose.model(collectionName).schema;

                Object.entries(schema.paths)
                    .filter(([key, value]) => key != "__v" && key != "_id")
                    .forEach(([key, value]) => fieldNames.push(key));


                resolve(fieldNames);
            } catch (e) {
                console.log(e);
                reject(e);
            }

        })
    }
    public getTableColumnsWithTypes(collectionName): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let fieldNames = [];
                const schema = mongoose.model(collectionName).schema;
                console.log(schema);

                Object.entries(schema.paths)
                    .filter(([key, value]) => key != "__v" && key != "_id")
                    .forEach(([key, value]) => fieldNames.push({key:key,type:value.instance}));


                resolve(fieldNames);
            } catch (e) {
                console.log(e);
                reject(e);
            }

        })
    }




}

export default MapperRepo;