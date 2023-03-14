import api from "./api";
import jwt_decode from "jwt-decode";

interface MyToken {
    "sub": string,
    "id": number,
    "role": string,
    "iat": string,
    "exp": string
}

let config = {
    headerWithAuth: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
    },
    headerWithoutAuth: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    },
};

const ApiService = {
    URL: "http://localhost:8080",

    checkHeaderWithAuth() {
        if (config.headerWithAuth.Authorization != `Bearer ${localStorage.getItem("accessToken")}`) {
            config.headerWithAuth.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
        }
    },

    async login(email: string, password: string) {
        return await api.post(`/api/auth/login`, {
            "email": email,
            "password": password
        }, {headers: config.headerWithoutAuth}).then(response => {
            localStorage.setItem("accessToken", response.data.access_token);
            localStorage.setItem("refreshToken", response.data.refresh_token);
            return response
        })
    },

    addCompany(name: string, city: string, state: string, street: string, zipCode: string) {
        return api.post(`/api/control-panel/company`, {
            "name": name,
            "address": {
                "city": city,
                "state": state,
                "street": street,
                "zipCode": zipCode
            },
            "employeeList": []
        }, {headers: config.headerWithAuth}).then(response => {
            return response
        })
    },

    signUp(email: string, password: string) {
        return api.post(`/api/auth/register`, {
            "email": email,
            "password": password
        }, {headers: config.headerWithoutAuth}).then(response => {
            return response
        })
    },

    isUser() {
        let token = localStorage.getItem("accessToken") || "";
        return !!token;
    },

    isCompany() {
        let token = localStorage.getItem("accessToken") || "";
        let decodedToken = jwt_decode<MyToken>(token);
        this.checkHeaderWithAuth()
        return api.get(`/api/control-panel/user/` + decodedToken.id, {headers: config.headerWithAuth}).then(response => {
            return response.data;
        }).then(data => {
            return data;
        })
    },

    addEmployee(city: string, state: string, street: string, zipCode: string, employeeDepartment: string, age: any, firstName: string, lastName: string, salary: any) {
        return api.post(`/api/control-panel/employees`, {
            "address": {
                "city": city,
                "state": state,
                "street": street,
                "zipCode": zipCode
            },
            "employeeDepartment": employeeDepartment,
            "person": {
                "age": Number(age),
                "firstName": firstName,
                "lastName": lastName
            },
            "salary": Number(salary),
            "sickDays": 0,
            "vacationDays": 0,
            "ill": false,
            "onVacation": false
        }, {headers: config.headerWithAuth}).then(response => {
            return response
        })
    },


    getCompany() {
        let token = localStorage.getItem("accessToken") || "";
        let decodedToken = jwt_decode<MyToken>(token);
        this.checkHeaderWithAuth()
        return api.get(`/api/control-panel/get/company/user/` + decodedToken.id, {headers: config.headerWithAuth}).then(response => {
            return response;
        })
    },

    getAllEmployees() {
        let token = localStorage.getItem("accessToken") || "";
        let decodedToken = jwt_decode<MyToken>(token);
        this.checkHeaderWithAuth()
        return api.get(`/api/control-panel/employees/company`, {headers: config.headerWithAuth}).then(response => {
            return response;
        })
    },

    deleteEmployee(id: any) {
        this.checkHeaderWithAuth()
        return api.delete(`/api/control-panel/employees/`+ id, {headers: config.headerWithAuth}).then(response => {
            return response.status === 200;
        });
    },

    getEmployeeById(id: any) {
        let token = localStorage.getItem("accessToken") || "";
        let decodedToken = jwt_decode<MyToken>(token);
        this.checkHeaderWithAuth()
        return api.get(`/api/control-panel/employees/`+ id, {headers: config.headerWithAuth}).then(response => {
            return response;
        })
    },

    editEmployee(id: string,city: string, state: string, street: string, zipCode: string, employeeDepartment: string, age: any, firstName: string, lastName: string, salary: any,
                 ill: boolean, onVacation: boolean, sickDays: string, vacationDays: string, companyId: string,
    ) {
        return api.put(`/api/control-panel/employees/edit`, {
            "id": Number(id),
            "address": {
                "city": city,
                "state": state,
                "street": street,
                "zipCode": zipCode
            },
            "employeeDepartment": employeeDepartment,
            "person": {
                "age": Number(age),
                "firstName": firstName,
                "lastName": lastName
            },
            "company": {
                "id": Number(companyId),
            },
            "salary": Number(salary),
            "sickDays": Number(sickDays),
            "vacationDays": Number(vacationDays),
            "ill": ill,
            "onVacation": onVacation
        }, {headers: config.headerWithAuth}).then(response => {
            return response
        })
    },
}

export default ApiService;