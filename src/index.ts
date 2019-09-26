import {Sorter} from './Sorter';
import {NumbersCollection} from './NumbersCollection';
import {CharacterCollection} from './CharacterCollection';
import { LinkedList } from './LinkedList';

const numbersCollection = new NumbersCollection([10,3,-5,10]);
numbersCollection.sort();
console.log(numbersCollection.data);

const characterCollection = new CharacterCollection('kot i pies');
characterCollection.sort();
console.log(characterCollection.data);

const linkedList = new LinkedList();
linkedList.add(4);
linkedList.add(-10);
linkedList.add(2);
linkedList.add(-100);
linkedList.sort();
linkedList.print();
