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

export async function createEntry(data: CreateEntryRequest) {
    const requestOptions = {
        url: `${apiUrl}/entry`,
        method: 'POST',
        data,
    };
    const response = await requestWrapper(requestOptions);
    return response.data;
}

export async function moveEntry(data: UpdateEntryRequest) {
    const requestOptions = {
        url: `${apiUrl}/entry`,
        method: 'PUT',
        data,
    };
    const response = await requestWrapper(requestOptions);
    return response.data;
}
