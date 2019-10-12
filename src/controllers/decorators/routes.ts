import 'reflect-metadata';
import {Methods} from './Methods';
import {MetadataKeys} from './MetadataKeys';
import { RequestHandler } from 'express';


// ten intefejs bedzie nam chronil metody expressu by miala (req,res)
interface RouteHandlerDescriptor extends PropertyDescriptor{
    value?:RequestHandler
}

function routeBinder(method: Methods) {
    return function (path: string) {
        return function (target: any, key: string, desc: RouteHandlerDescriptor) {
            Reflect.defineMetadata(MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys.method, method, target, key);
        }
    }
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
