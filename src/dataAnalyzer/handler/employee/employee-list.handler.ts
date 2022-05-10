import { IEmployee } from "../../model/employee.model";
import EmployeeListRepo from "../../repo/employee/employee-list.repo";

class EmployeeListHandler {
    private static employeeListHandler: EmployeeListHandler;
    private employeeListRepo:EmployeeListRepo = EmployeeListRepo.getRepoInstance();

    private constructor() {
    }

    public static getHandlerInstance() {
        if (!this.employeeListHandler) {
            this.employeeListHandler = new EmployeeListHandler();
            return this.employeeListHandler;
        }
        return this.employeeListHandler;
    }

    public async getList(): Promise<IEmployee[]> {
        return await this.employeeListRepo.getList();
    }

    public async getSortedList(column, value): Promise<IEmployee[]> {
        return await this.employeeListRepo.getSortedList(column,value);
    }

    
}

export default EmployeeListHandler;
