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
    public async getSortedList(modelName,sortBy, sortType, pageSize, pageIndex,payload): Promise<EmployeeDto[]> {
        return await this.employeeListRepo.getSortedList(modelName,sortBy, sortType, pageSize, pageIndex,payload);
    }

    public async getSearchedEmployeeList(minRange, maxRange, searchedText): Promise<EmployeeDto[]> {
        return await this.employeeListRepo.getSearchedEmployeeList(minRange, maxRange, searchedText);
    }
    public async countEmployees(modelName,payload): Promise<Number> {
        return await this.employeeListRepo.countEmployees(modelName,payload);
    }
}

export default EmployeeListHandler;
