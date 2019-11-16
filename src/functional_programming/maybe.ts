namespace Maybe_2{


    class Maybe <T>{

        private $value:T;
        static of<T>(x:T) {
          return new Maybe(x);
        }
      
        get isNothing() {
          return this.$value === null || this.$value === undefined;
        }
      
        constructor(x:T) {
          this.$value = x;
        }
      
        map(fn: (value: T) => T): Maybe<T> {
          return this.isNothing ? this : Maybe.of(fn(this.$value));
        }
      
        inspect():string {
          return this.isNothing ? 'Nothing' : `Just(${this.$value})`;
        }
      }

     let maybe =  Maybe.of(2).map((value)=>value +3 ).inspect();
     console.log(maybe);


}