
export const SERVER_URL = 'http://172.20.10.2:9090/api/v1';

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const buildRequest = (
    method: HttpMethod,
    body?: object,
    jwt?: string
): RequestInit => {

    const headers = {
        ...(method !== "GET" && { "Content-Type": "application/json" }),
        ...(jwt && { Authorization: `Bearer ${jwt}` }),
    };

    const request: RequestInit = {
        method,
        headers,
    };

    if (body && method !== "GET") {
        request.body = JSON.stringify({ data: body });
    }

    return request;
};



export interface IApiObject {
    id: string;
    type: ApiObjectType;
}

export enum ApiObjectType {
    USER = 'user',
    GAME = 'game',
    COLLECTION = 'collection',
}