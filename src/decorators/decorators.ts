

class Boat {
    @testDecorator
    color: string = 'red';

    get formattedColor(): string {
        return `This bout color is ${this.color}`;
    }

    @logError
    pilot(): void {
        throw new Error();
    }
}

/* Target to bedzie nasz prototyp w tym wypadku bedzie to proptyp  Boat czyli wszystkie funkcje i gettery 
   tu beda w srodku ale nie bedzie koloru. Ale mozna dac dekorator do coloru wtedy otrzymamy jego klucz
*/
function testDecorator(target: any, key: string): void {
    console.log('Target', target);
    console.log('key:', key);
}

function logError(target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;
    desc.value = function (){
        try{
            method();

        }catch(e){
            console.log('Boat was sinking !!!! error from decorator');
        }
    }
}

//jak by nie uzywac dekoratorów to bedzie dzialac identycznie
//to dziala jeszcze przed zrobienie instancji classy
testDecorator(Boat.prototype, 'pilot');


//test
const boat = new Boat();
boat.pilot();