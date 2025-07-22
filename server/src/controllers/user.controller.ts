import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1; // get page number from query
        const limit = Number(req.query.limit) || 10; // get limit from query
        const { users, total } = await userService.listUsers(page, limit); // get users paginated
        res.json({ users, total });
    } catch (err) {
        next(err);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, avatarUrl } = req.body; // get name and avatarUrl from request body
        const newUser = await userService.createUser(name, avatarUrl); // create user
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};