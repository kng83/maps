// type alias
//type Callback = () => {}; -- ta funkcja zwraca objekt
type Callback = () => void //ta nic nie zwraca

export class Eventing {
    // tu jest robiony obiekt ktorego kluczem jest nazwa eventu a 
    // wartoscia tablica callbackow
    events: { [key: string]: Callback[] } = {};

    on = (eventName: string, callback: Callback): void => {
        // if events are not defined create empty array
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers //Callback[] or undefined
    }

    trigger = (eventName: string): void => {
        const handlers = this.events[eventName];

        if (!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach(callback => callback())
    }
}