import { EmployeeDto } from "../../dto/employee.dto";
import employeeModel, { IEmployee } from "../../model/employee.model";

class EmployeeListRepo {
    static employeeInfoRepo: EmployeeListRepo;
    private constructor() {
    }

    public static getRepoInstance() {
        if (!this.employeeInfoRepo) {
            this.employeeInfoRepo = new EmployeeListRepo();
        }
        return this.employeeInfoRepo;
    }

    public async getList(): Promise<EmployeeDto[]> {
        return await employeeModel.find({}, { _id: 0, __v: 0 });
    }

    public async getSortedList(sortBy, sortType, pageSize, pageIndex): Promise<EmployeeDto[]> {
        var sort = this.getSortClause(sortBy, sortType);
        const take = parseInt(pageSize, 10);
        const skip = (parseInt(pageIndex, 10) - 1) * take;
        const data = employeeModel.find({}, { _id: 0, __v: 0 }).sort(sort);
        const result = pageSize === -1
            ? await data.lean().exec()
            : await data.skip(skip).limit(take).lean().exec();
        return result;
    }

    public async getSearchedEmployeeList( minRange, maxRange, searchedText): Promise<EmployeeDto[]> {
        employeeModel.createIndexes({
            name: "text"

         });
        //  const query = { $text: { $search: searchedText } };
        //  // Return only the `title` of each matched document
        //  const projection = {
        //    _id: 0,
        //    email: 1,
        //  };
         const dt = await employeeModel.find({$text:{$search:searchedText}}).lean().exec();
        //  const dt =  await employeeModel.aggregate([
        //     // {
        //     //    $search: {
        //     //       "range": {
        //     //          "path": "salary",
        //     //          "gte": parseInt(minRange),
        //     //          "lte": parseInt(maxRange)
        //     //       }
        //     //    }
        //     // },
         
        //     // {
        //     //    $project: {
        //     //       "_id": 0,
        //     //       "name": 1,
        //     //       "email": 1,
        //     //       "salary": 1
        //     //    }
        //     // }
        
            
        //         { $match: { $text: { $search: "erf " } } },
        //         { $project: { email: 1, _id: 0 } }
              
        // ]);
        // const data = await employeeModel.find( { _id: 0, __v: 0 },{salary: {
        //     $gte:parseInt(minRange),
        //     $lte: parseInt(maxRange) 
        // }},{ $text: { $search: searchedText } }).lean().exec();
        return dt;
    }
    public async countEmployees(): Promise<Number> {
        const data = employeeModel.find({}, { _id: 0, __v: 0 }).count();
        return data;
    }
    private getSortClause = (sortColumn, orderBy) => {
        let sort = {};
        if (sortColumn) {
            const key = sortColumn;
            const value = parseInt(orderBy, 10) ?? 1;
            sort[key] = value;
        } else {
            sort = { updatedAt: -1 };
        }
        return sort;
    };
}

export default EmployeeListRepo;