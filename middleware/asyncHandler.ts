import { Request, Response, NextFunction } from 'express';
import CustomRequest from '../config/customRequest';

type AsyncFunction<T = any> = (req: CustomRequest, res: Response, next: NextFunction) => Promise<any>;

export default <T>(execution: AsyncFunction<T>) => (req: CustomRequest, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(next);
};