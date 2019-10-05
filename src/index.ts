import {User} from './models/User';

import axios from 'axios';

axios.post('http://localhost:3000/users',{
    name:"mayname",
    age:99
})

axios.get('http://localhost:3000/users/1')