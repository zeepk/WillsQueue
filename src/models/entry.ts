import { Document, Schema, model } from 'mongoose';

export type Status = 'queue' | 'ingame' | 'archived';

export interface IEntry extends Document {
    authId: string;
    username: string;
    avatar: string;
    status: Status;
}

const EntrySchema = new Schema<IEntry>(
    {
        authId: String,
        username: String,
        avatar: String,
        status: String,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

export const Entry = model<IEntry>('Entry', EntrySchema);
