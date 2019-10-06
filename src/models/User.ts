import {Eventing} from './Eventing';

export interface UserProps {
    id?:number;
    name?: string;
    age?: number;
}

export class User {

    public events:Eventing = new Eventing();
    constructor(private data: UserProps) { }

    // get property by name
    get(propName: string): (number | string) {
        return this.data[propName];
    }

    // set new property value
    set(update: UserProps): void {
        Object.assign(this.data, update);
    }

}