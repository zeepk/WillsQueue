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
    authId: string;
    status: Status;
};

export const userUsername = 'https://willsqueue.com/username';
export const userRole = 'https://willsqueue/roles';

// TODO: pass in Auth0 user and compare authId to parsed list of admin authIds from db
export const isAdmin = (user: any) => user[userRole]?.length > 0;
export const getUsernameFromUser = (user: any) => user[userUsername];
