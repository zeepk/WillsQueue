import express, { Request, Response } from 'express';
import { Flag } from '../models/flag';
import { ApiResponse } from '../utils/customTypes';
import dotenv from 'dotenv';
dotenv.config();
/* eslint-disable */
const { expressjwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const checkJwt = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 100,
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),

    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
});
const router = express.Router();

router.get('/api/flag', async (req: any, res: any) => {
    const resp: ApiResponse = {
        success: true,
        message: '',
        data: [],
    };

    const flags = await Flag.find();

    resp.data = flags;
    return res.status(200).send(resp);
});

router.put('/api/flag', checkJwt, async (req: Request, res: Response) => {
    const { user, name, enabled } = req.body;
    const adminRole = process.env.ADMIN_ROLE || '';
    const resp: ApiResponse = {
        success: true,
        message: '',
    };

    const isAdmin = user['https://willsqueue/roles']?.includes(adminRole);

    if (!isAdmin) {
        const message = 'User does not have permission to update this flag';
        resp.success = false;
        resp.message = message;
        console.error(message);
        return res.status(400).send(resp);
    }

    const validRequest = user?.sub && name;

    if (!validRequest) {
        const message = 'Request parameters not correctly provided';
        resp.success = false;
        resp.message = message;
        console.error(message);
        return res.status(500).send(resp);
    }

    const flag = await Flag.findOne({
        name,
    });

    if (!flag) {
        // not logged in
        const message = 'No flag exists with name: ' + name;
        resp.message = message;
        resp.success = false;
        console.error(message);
        return res.status(404).send(resp);
    }

    flag.enabled = enabled;
    await flag.save();

    resp.data = flag;
    return res.status(200).send(resp);
});

export { router as flagRouter };
