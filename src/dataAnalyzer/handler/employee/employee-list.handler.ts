import { EmployeeDto } from "../../dto/employee.dto";
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

    public async getList(): Promise<EmployeeDto[]> {
        return await this.employeeListRepo.getList();
    }
    public async getSortedList(sortBy, sortType, pageSize, pageIndex): Promise<EmployeeDto[]> {
        return await this.employeeListRepo.getSortedList(sortBy, sortType, pageSize, pageIndex);
    }
    public async countEmployees(): Promise<Number> {
        return await this.employeeListRepo.countEmployees();
    }
}

export default EmployeeListHandler;
