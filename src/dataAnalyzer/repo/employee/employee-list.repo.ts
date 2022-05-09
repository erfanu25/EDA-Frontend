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
        let anc = column;
        return await employeeModel.find({},{_id:0,__v:0}).sort({column : Number(value)});
  

    }
    
}

export default EmployeeListRepo;