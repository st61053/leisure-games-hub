import { IApiObject } from "../app/config";

export interface IUserState {
    jwt: string | undefined;
    loginUserId: string | undefined;
    loggedUser: IUser | null;
    users: IUser[];
    loginData: ILoginData;
    loading: IUserLoading;
    error: IUserErrorMessage;
}

export interface IUser extends IApiObject {
    attributes: {
        username: string;
        firstname: string;
        lastname: string;
        email: string;
    }
}

export interface ILoginData extends IApiObject {
    attributes: {
        email: string;
        password: string;
    }
}

export interface IUserLoading {
    login: boolean;
    loggedUser: boolean;
    users: boolean;
}

export interface IUserErrorMessage {
    login: string;
    loggedUser: string;
    users: string;
}