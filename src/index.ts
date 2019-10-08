import {UserEdit} from './views/UserEdit';
import {User,UserProps} from './models/User';
import {UserList}from './views/UserList';
import {Collection} from './models/Collection';



const users = new Collection('http://localhost:3000/users',(jsonData:UserProps)=>{
    return User.buildUser(jsonData);
})

users.on('change', ()=>{
    const root = document.getElementById('root');
    if(root){
        new UserList(root,users).render();
    }
})
users.fetch();


// const user = User.buildUser({name:'robot', age:10});
// const root = document.getElementById('root');
// if(root){
//     const userEdit = new UserEdit(root,user);
//     userEdit.render();
//     console.log(userEdit);
// }else {
//     throw new Error("Root element not found");
// }



