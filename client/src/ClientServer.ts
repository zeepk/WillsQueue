import requestWrapper from './utils/requestWrapper';
import { CreateEntryRequest, UpdateEntryRequest } from './utils/constants';
const baseUrl = 'http://localhost:8080/api';

export async function getEntries() {
    const requestOptions = {
        url: `${baseUrl}/entry`,
        method: 'GET',
    };
    const response = await requestWrapper(requestOptions);
    return response.data;
}

export async function createEntry(data: CreateEntryRequest) {
    const requestOptions = {
        url: `${baseUrl}/entry`,
        method: 'POST',
        data,
    };
    const response = await requestWrapper(requestOptions);
    return response.data;
}

export async function moveEntry(data: UpdateEntryRequest) {
    const requestOptions = {
        url: `${baseUrl}/entry`,
        method: 'PUT',
        data,
    };
    const response = await requestWrapper(requestOptions);
    return response.data;
}
