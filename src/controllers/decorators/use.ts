import 'reflect-metadata';
import { MetadataKeys } from './metadataKeys';
import { RequestHandler } from 'express';


export function use(middleware: RequestHandler) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

        //** Dodajemy nasze middleware do tablicy middlewarow jezeli nie bylo zadnych to dodajemy do pustej tablics */
        Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key);

    }
}

