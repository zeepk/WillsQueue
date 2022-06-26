import requestWrapper from './utils/requestWrapper';
import { CreateEntryRequest, UpdateEntryRequest } from './utils/constants';
const baseUrl = process.env.REACT_APP_API_URL;
const apiUrl = `${baseUrl}/api`;

export async function getEntries() {
    const requestOptions = {
        url: `${apiUrl}/entry`,
        method: 'GET',
    };
    const response = await requestWrapper(requestOptions);
    return response.data;
}

export async function createEntry(accessToken, data: CreateEntryRequest) {
    const requestOptions = {
        url: `${apiUrl}/entry`,
        method: 'POST',
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const response = await requestWrapper(requestOptions);
    return response.data;
}

export async function moveEntry(accessToken, data: UpdateEntryRequest) {
    const requestOptions = {
        url: `${apiUrl}/entry`,
        method: 'PUT',
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const response = await requestWrapper(requestOptions);
    return response.data;
}

export async function clearList(
    accessToken,
    data: { user: any; status: string }
) {
    const requestOptions = {
        url: `${apiUrl}/clear`,
        method: 'PUT',
        data,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    const response = await requestWrapper(requestOptions);
    return response.data;
}
