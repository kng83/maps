
export interface Sortable {
    length: number;
    compare(leftIndex: number, rightIndex: number): boolean;
    swap(leftIndex: number, rightIndex: number): void;
}

export abstract class Sorter{
   
    public abstract swap:any;
    public  abstract length:number;
    public abstract  compare:any;

    sort(): void {
        //tu dlugosc destrukturyzajca to jest bubble sort 
        //jedziemy od lewej do prawej sprawdzamy czy element po lewej jest wiekszy
        //jesli tak to robimy swapa i tak do konca 
        //przy nastepnej iteracji petli mamy juz prawidlowy ostatni element wiec go pomijamy
        // to jest ta druga petla w ktorej jest minus 1
        //Type guard typeof this.some ==='string' to prosty
        //A to type guard dla obietktu  this.some instanceof Array
        // If collection is array of numbers (to jest type Guard bo jest instanceof jak sa typy proste to typeof sie daje)
        const { length } = this;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - i - 1; j++) {
                if (this.compare(j, j + 1)) {
                    this.swap(j, j + 1);
                }
            }
        }
    }
}
