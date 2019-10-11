import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler, NextFunction, Request, Response } from 'express';

function bodyValidators(keys: string): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send('invalid no body');
            return;
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send('missing property keys');
                return;
            }
        }
        next();
    }
}


// to bedzie dekorator wydobywajacy metadane z naszej klasy
export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();

        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];

            //** Tu pobieramy nasze sciezki ktore sa zapisany w reflect-metada */
            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || []; // dla bezpieczenstw pusta tablica
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || []; // validator dodany

            const validator = bodyValidators(requiredBodyProps);

            //** jezli sciezka istnieje pobierz metody i zrob obsluge trasy */
            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
            }
        }
    }
}