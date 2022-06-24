export type Status = 'queue' | 'ingame' | 'archived';

export type Entry = {
    authId: string;
    username: string;
    avatar: string;
    status: Status;
    createdAt: string;
    updatedAt: string;
};

export type CreateEntryRequest = {
    authId: string;
    username: string;
    avatar: string;
};

export type UpdateEntryRequest = {
    user: any;
    status: Status;
};

export const userUsername = 'https://willsqueue.com/username';
export const userRole = 'https://willsqueue/roles';

export const isAdmin = (user: any) => user && user[userRole]?.length > 0;
export const getUsernameFromUser = (user: any) =>
    user ? user[userUsername] : null;
