import { Document, Schema, model } from 'mongoose';

export interface IFlag extends Document {
    name: string;
    enabled: boolean;
}

const FlagSchema = new Schema<IFlag>(
    {
        name: String,
        enabled: false,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

export const Flag = model<IFlag>('Flag', FlagSchema);
