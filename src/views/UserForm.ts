import { User, UserProps } from '../models/User';
import { View } from './View';


export class UserForm extends View<User,UserProps> {


    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick
        }
    }

    onSaveClick=():void =>{
        this.model.save();
    }

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input');
        //**Dla strict mode dajemy typeguard */
        if (input) {
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
         <input placeholder="${this.model.get('name')}"/>
         <button class="set-name">Change Name</button>
         <button class="set-age">Set random Age</button>
         <button class="save-model">Save User</button>
        </div>
        `;
    }


}