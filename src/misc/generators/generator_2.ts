namespace Generator_2{

    const colors = {
        red:'czerwony',
        black: 'czarny',

        [Symbol.iterator] : function *(){
            yield this.red;
            yield this.black;
        }
    }

    for(let color of colors){
        console.log(color); // czerwony ,czarny
    }

    // teraz test z klasa

    class Colors{
        red = 'czerwony';
        black = 'czarny';

        *[Symbol.iterator](){
            yield this.red;
            yield this.black;
        }
    }

    let colorsPallet = new Colors();
    for(let c of colors){
        console.log(c);
    }
}