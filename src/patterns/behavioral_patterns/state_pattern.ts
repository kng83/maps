import JQuery  from 'jQuery'

export namespace StatePattern {

    interface State {
        render(hover: boolean): void;
        click(): void;
    }

    class StateEnabled implements State {
        constructor(public context: Context) { }
        render(hover: boolean): void {
            console.log('enable is rendered')
            this.context
                .element
                .removeClass('disabled')
                .addClass('hover');
        }
        click(): void {
            this.context.onclick();
        }
    }

    class StateDisabled implements State {
        constructor( public context: Context) { }
        render(): void {
            console.log('disable is rendered')
            this.context
                .element
                .addClass('disabled')
                .removeClass('hover');
        }
        click(): void {
            // Do nothing.
        }
    }
    class Context {
     //   element!: JQuery;
        private stateEnabled:StateEnabled;
        private stateDisabled:StateDisabled ;
        state:State = this.stateDisabled;

        constructor(public element:JQuery) {
            this.stateDisabled = new StateDisabled(this);
            this.stateEnabled = new StateEnabled(this)
            this.element.hover(() => this.render(true),() => this.render(false)).click(() => this.click());
            console.log('some is defined',element);
            this.render(false);
        }

        private render(hover: boolean): void {
            console.log('herer is render',hover);
            this.state  = hover ? this.stateEnabled : this.stateDisabled;
            this.state.render(hover);
        }

        private click(): void {
            this.state.click();
        }
        onclick(): void {
            console.log('I am clicked.');
        }

    }

    let element = document.getElementsByClassName("bobo") as HTMLCollection;
    setTimeout(()=>{
        console.log(element[0])
        let context = new Context(JQuery(element[0] as HTMLElement));
    },200)
    

}