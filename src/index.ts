import {Sorter} from './Sorter';
import {NumbersCollection} from './NumbersCollection';
import {CharacterCollection} from './CharacterCollection';

const sorter = new Sorter(new NumbersCollection([10, 3, -5, 0, 20]));
sorter.sort();
console.log(sorter.collection);

const sorter2 = new Sorter(new CharacterCollection('boboKot2'));
sorter2.sort();
console.log(sorter2.collection);