export type Status = 'queue' | 'ingame' | 'archived';

export type Entry = {
    authId: string;
    username: string;
    avatar: string;
    status: Status;
    createdAt: string;
    updatedAt: string;
};

export type Flag = {
    name: string;
    enabled: boolean;
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
    username: string;
};

export type ChangeFlagRequest = {
    user: any;
    name: string;
    enabled: boolean;
};

export const userUsername = 'https://willsqueue.com/username';
export const userRole = 'https://willsqueue/roles';

export const isAdmin = (user: any) => user && user[userRole]?.length > 0;
export const getUsernameFromUser = (user: any) =>
    user ? user[userUsername] : null;

export const getFriendlyQueuePosition = (i: number): string => {
    const wholeNumber = Math.floor(i);
    const numberString = wholeNumber.toString();
    const lastDigit = Number(numberString[numberString.length - 1]);

    if (
        numberString.length > 1 &&
        ['11', '12', '13'].includes(
            numberString.substring(numberString.length - 2, numberString.length)
        )
    ) {
        return `${numberString}th`;
    }

    if (lastDigit === 1) {
        return `${numberString}st`;
    }

    if (lastDigit === 2) {
        return `${numberString}nd`;
    }

    if (lastDigit === 3) {
        return `${numberString}rd`;
    }

    return `${numberString}th`;
};
