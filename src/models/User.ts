import { isObjectLiteralElementLike } from "typescript";
import { callbackify } from "util";

interface UserProps {
    name?: string;
    age?: number;
    id?:number;
}

// type alias
//type Callback = () => {}; -- ta funkcja zwraca objekt
type Callback = () => void //ta nic nie zwraca

export class User {

    // tu jest robiony obiekt ktorego kluczem jest nazwa eventu a 
    // wartoscia tablica callbackow
    events: { [key: string]: Callback[] } = {};
    constructor(private data: UserProps) { }

    // get property by name
    get(propName: string): (number | string) {
        return this.data[propName];
    }

    // set new property value
    set(update: UserProps): void {
        Object.assign(this.data, update);
    }

    on(eventName: string, callback: Callback): void {
        // if events are not defined create empty array
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers //Callback[] or undefined
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if (!handlers || handlers.length === 0) {
            return;
        } 

        handlers.forEach(callback => callback())
    }
}