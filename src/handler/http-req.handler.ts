// import * as rm from "typed-rest-client/RestClient";
// import { IUser } from "../Models/User.model";

// class HttpReqHandler {
//     static isSignIn: boolean;
//     static HttpReqHandler: HttpReqHandler;
//     constructor() {
//     }

//     public static getHandlerInstance() {
//         if (!this.HttpReqHandler) {
//             this.HttpReqHandler = new HttpReqHandler();
//         }
//         return this.HttpReqHandler;
//     }

//     async readFromAzFuncUser() {
//         let rest: rm.RestClient = new rm.RestClient("user");
//         let res: rm.IRestResponse<HttpResObj> = await rest.get<HttpResObj>(process.env["AZ_FUNC_BASEURL"] + "/user");

//         console.log('http call :--> ', process.env["AZ_FUNC_BASEURL"] + "/user");
//         console.log('res:--> ', res);
//         return res.result?.documentResponse;
//     }

//     async readFromAzFuncUserByName() {
//         let rest: rm.RestClient = new rm.RestClient("user");
//         let res: rm.IRestResponse<IUser[]> = await rest.get<IUser[]>(process.env["AZ_FUNC_BASEURL"] + "/user");

//         console.log('res:--> ', res);
//         return res.result;
//     }

//     async updateAzFuncUser(user: IUser) {
//         let httpReqObj: HttpReqObj = {
//             document: user
//         }

//         let options: rm.IRequestOptions = this.httpBinOptions();
//         let rest: rm.RestClient = new rm.RestClient("user");
//         let res: rm.IRestResponse<HttpResObj> = await rest.create<HttpResObj>(process.env["AZ_FUNC_BASEURL"] + "/user", httpReqObj);

//         console.log('http call :--> ', process.env["AZ_FUNC_BASEURL"] + "/user");
// console.log('res.result?.documentResponse:--> ', res.result?.documentResponse);
//         return res.result?.documentResponse;
//     }

//     httpBinOptions(): rm.IRequestOptions {
//         let options: rm.IRequestOptions = <rm.IRequestOptions>{};
//         options.responseProcessor = (obj: any) => {
//             return obj['data'];
//         }
    
//         return options; 
//     }

// }

// export default HttpReqHandler;

// interface HttpResObj {
//     documentResponse: any
// }
// interface HttpReqObj {
//     document: any
// }