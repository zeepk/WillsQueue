import express, { Request, Response } from 'express';
import { Entry } from '../models/entry';
import { ApiResponse } from '../utils/customTypes';
const router = express.Router();

router.get('/api/entry', async (req: Request, res: Response) => {
    const resp: ApiResponse = {
        success: true,
        message: '',
        data: [],
    };

    const entries = await Entry.find(
        { status: { $in: ['queue', 'ingame'] } },
        { authId: 0 }
    );

    resp.data = entries;
    return res.status(200).send(resp);
});

router.post('/api/entry', async (req: Request, res: Response) => {
    const { authId, username, avatar } = req.body;
    const resp: ApiResponse = {
        success: true,
        message: '',
    };

    const validRequest = authId && username && avatar;

    if (!validRequest) {
        const message = 'Request parameters not correctly provided';
        resp.message = message;
        console.error(message);
        return res.status(500).send(resp);
    }

    const entry = await Entry.findOne({
        authId: authId,
        status: { $in: ['queue', 'ingame'] },
    });
    if (entry) {
        // not logged in
        const message = 'Entry for this user already exists';
        resp.data = entry;
        resp.message = message;
        resp.success = false;
        console.error(message);
        return res.status(400).send(resp);
    }

    const createdEntry = await Entry.create({
        authId,
        username,
        avatar,
        status: 'queue',
    });

    resp.data = createdEntry;
    return res.status(200).send(resp);
});

router.put('/api/entry', async (req: Request, res: Response) => {
    const { user, status } = req.body;
    const adminRole = process.env.ADMIN_ROLE || '';
    const resp: ApiResponse = {
        success: true,
        message: '',
    };

    const isAdmin = user['https://willsqueue/roles']?.includes(adminRole);

    if (!isAdmin) {
        const message = 'User does not have permission to update this entry';
        resp.message = message;
        console.error(message);
        return res.status(400).send(resp);
    }

    const validRequest = user?.sub && status;

    if (!validRequest) {
        const message = 'Request parameters not correctly provided';
        resp.message = message;
        console.error(message);
        return res.status(500).send(resp);
    }

    const entry = await Entry.findOne({
        authId: user.sub,
        status: { $in: ['queue', 'ingame'] },
    });
    if (!entry) {
        // not logged in
        const message = 'No entry for this user exists';
        resp.message = message;
        resp.success = false;
        console.error(message);
        return res.status(404).send(resp);
    }

    entry.status = status;
    await entry.save();

    resp.data = entry;
    return res.status(200).send(resp);
});

export { router as entryRouter };
