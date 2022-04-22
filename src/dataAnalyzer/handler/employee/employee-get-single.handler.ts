import EmployeeGetSingleRepo from "../../repo/employee/employee-get-single.repo";

class EmployeeGetSingleHandler {
    private static employeeGetSingleHandler: EmployeeGetSingleHandler;
    private employeeGetSingleRepo:EmployeeGetSingleRepo = EmployeeGetSingleRepo.getRepoInstance();

    private constructor() {
    }
    public static getHandlerInstance() {
        if (!this.employeeGetSingleHandler) {
            this.employeeGetSingleHandler = new EmployeeGetSingleHandler();
            return this.employeeGetSingleHandler;
        }
        return this.employeeGetSingleHandler;
    }
    public async Get(name:string):Promise<any>{
        return await this.employeeGetSingleRepo.Get(name);
    }
}

export default EmployeeGetSingleHandler;
