import {User} from './models/User';


const user = new User({name:'kot',age:10});

user.events.on('change',()=>{
    console.log('change');
})

user.events.trigger('change');