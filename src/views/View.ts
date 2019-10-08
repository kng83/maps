import { Model } from '../models/Model';


interface ModelForView {
    on(eventName: string, callback: () => void): void;
}

export abstract class View<T extends Model<K>, K> {

    regions: { [key: string]: Element } = {};


    abstract template(): string;

    regionsMap(): { [key: string]: string } {
        return {};
    }

    //**EventsMap nie dajemy jako abstract bo nie zawsze zniej bedziemy korzystac */
    eventsMap(): { [key: string]: () => void } {
        return {};
    };

    constructor(public parent: Element, public model: T) {
        this.bindModel();
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
    }

    // tu sa bindowne eventy do selektorow zebranch w tablicy
    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            })
        }
    }

    //** Szukamy tutaj selectorow i parujemy je z regionamy */
    mapRegions(fragment:DocumentFragment):void {
        const regionsMap = this.regionsMap();

        for(let key in regionsMap){
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);
            if (element){
                this.regions[key] = element;
            }
        }
    }

    onRender():void{
        
    }

    render(): void {
        //** Czyscimy element Html tak by nie bylo powielania */
        this.parent.innerHTML = '';

        //** Tak sie robi template elemenet natywnie */
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        /** Bindujem eventy tutaj */
        this.bindEvents(templateElement.content);

        //** Mapowanie regionow by osadzic nastepny Html wewnatrz */
        this.mapRegions(templateElement.content);

        this.onRender();

        /** Tu jest wsadzany content z tego napisalismy */
        this.parent.append(templateElement.content);
    }

}