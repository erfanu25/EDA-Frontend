import EmployeeModel from "../../model/employee.model";

class EmployeeGetSingleRepo {
    static employeeGetRepo: EmployeeGetSingleRepo;
    private constructor() {
    }
    
    public static getRepoInstance() {
        if (!this.employeeGetRepo) {
            this.employeeGetRepo = new EmployeeGetSingleRepo();
        }
        return this.employeeGetRepo;
    }

    public async Get(employeeName :string) : Promise<any>{
        return EmployeeModel.find({name:employeeName}).populate("name");
    }
}

export default EmployeeGetSingleRepo;