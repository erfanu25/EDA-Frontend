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
        return await employeeModel.find({});
        // .then(p=>console.log(p))
        // .catch(error=>console.log(error));;
    }
    
}

export default EmployeeListRepo;