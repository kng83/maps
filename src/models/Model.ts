import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
    set(update: T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];

}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {

    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) { }

    // to jest super bo jest tylko referencja i nie mamy balaganu !!!!!
    // get on() {
    //     return this.events.on;
    // }

    // wersja 2 bez get to bedzie dzialac bo wszystkie zaleznosci definiujemy w konstruktorze
    // inaczej by one byly po tych funkcjach i odwolywaly by sie do niczego
    // typescipt playground to pokazuje

    on = this.events.on;
    trigger = this.events.trigger;
    get = this.attributes.get;

    set(update: T): void {
        this.attributes.set(update);
        //tak by propagowac zmiany
        this.events.trigger('change');
    }

    fetch(): void {
        const id = this.get('id');

        if (typeof id !== 'number') {
            throw new Error("Cannot fetch without id")
        }

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data);
        })
    }

    save(): void {
        this.sync.save(this.attributes.getAll())
            .then((response: AxiosResponse) => {
                this.trigger('save');
            })
            .catch(() => {
                this.trigger('error');
            });
    }
}


// *** to wersja z get 
    // to jest super bo jest tylko referencja i nie mamy balaganu !!!!!
    // get on() {
    //     return this.events.on;
    // }



    // get trigger() {
    //     return this.events.trigger;
    // }

    // get get() {
    //     return this.attributes.get;
    // }