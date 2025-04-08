
export const SERVER_URL = 'http://10.221.248.242:9090/api/v1';

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
    attributes: {
        [key: string]: string;
    }
}

export enum ApiObjectType {
    USER = 'user',
}