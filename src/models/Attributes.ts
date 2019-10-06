
export class Attributes<T>{
    constructor(private data: T) { }

    // get property by name
    // tutaj dobralismy sie do typu zwracanego
    get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    // set new property value
    set(update: T): void {
        Object.assign(this.data, update);
    }
}
