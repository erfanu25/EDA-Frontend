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
        return await employeeModel.find({},{_id:0,__v:0});
    }

    public async getSortedList(column,value): Promise<EmployeeDto[]> {
        var sort=this.getSortClause(column,value);
        return await employeeModel.find({},{_id:0,__v:0}).sort(sort);
    }
    private  getSortClause = (sortColumn,orderBy) => {
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