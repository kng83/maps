import { User } from '../models/User';

export class UserForm {

    constructor(public parent: Element, public model: User) {
        this.bindModel();
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
    }
    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick
        }
    }

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input');
        //**Dla strict mode dajemy typeguard */
        if(input){
            const name = input.value;
            this.model.set({ name });
        }

    }

    // Poniewaz to zle bindowalo this
    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    }

    template(): string {
        return `
        <div>
         <h1>User Form</h1>
         <div>User name: ${this.model.get('name')}
         <div>User age: ${this.model.get('age')}
         <input/>
         <button class="set-name">Change Name</button>
         <button class="set-age">Set random Age</button>
        </div>
        `;
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            })
        }
    }

    render(): void {
        //** Czyscimy element Html tak by nie bylo powielania */
        this.parent.innerHTML = '';

        //** Tak sie robi template elemenet natywnie */
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        /** Bindujem eventy tutaj */
        this.bindEvents(templateElement.content);

        /** Tu jest wsadzany content z tego napisalismy */
        this.parent.append(templateElement.content);
    }
}