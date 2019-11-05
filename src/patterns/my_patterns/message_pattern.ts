

class MessageBasic{
        protected resolvePayload(payload:any){
            return payload;
        }
}

class Message extends MessageBasic{
    instanceField:any;
    answerField:any;
    sendMessageTo<T>(instance:T){
        this.instanceField = instance;
        this.answerField = null;
        return this;
    } 
    withKeyAndContent(payload:{key:string, content:any}){
        this.answerField = this.instanceField.resolvePayload(payload);
        return this;
    }
    takeResponse(fn:{(done:boolean, err?:boolean,content?:any):void}){
        if(this.answerField){
            return fn(true,false, this.answerField)
        }
        return fn(false,true, undefined);
    }
}
let testMessage = new Message();
let testMessage2 = new Message();
testMessage
    .sendMessageTo(testMessage2)
    .withKeyAndContent({key:'makeSome',content:'Jestem robo'})
    .takeResponse(console.log);