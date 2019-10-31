
class Payload{
    constructor(public weight: number){}
}

class Engine{
    constructor(public power:number){}
}

class Stage{
    constructor(public engineArr:Engine[]){}
}

class Rocket{
   public payload:Payload;
   public  stages:Stage[];
}

class RocketFactory {
    createPayload(): Payload {
        return new Payload(0);
    }
    createStages(): Stage[] {
        let engine = new Engine(1000);
        let stage = new Stage([engine]);
        return [stage];
    }
    buildRocket(): Rocket {
        let rocket = new Rocket();
        let payload = this.createPayload();
        let stages = this.createStages();
        rocket.payload = payload;
        rocket.stages = stages;
        return rocket;
    }
}


class Satellite extends Payload {
    constructor(public id: number) {
        super(200);
    }
}

class FirstStage extends Stage {
    constructor() {
        super([
            new Engine(1000),
            new Engine(1000),
            new Engine(1000),
            new Engine(1000)
        ]);
    }
}

class SecondStage extends Stage {
    constructor() {
        super([
            new Engine(1000)
        ]);
    }
}

type FreightRocketStages = [FirstStage, SecondStage];

class FreightRocketFactory extends RocketFactory {
    nextSatelliteId = 0;
    createPayload(): Satellite {
        return new Satellite(this.nextSatelliteId++);
    }
    
    createStages(): FreightRocketStages {
        return [
            new FirstStage(),
            new SecondStage()
        ];
    }
}

let rocketFactory = new RocketFactory();
rocketFactory.createStages();

let rocket = rocketFactory.buildRocket();
console.log(rocket.stages[0].engineArr);

let freightRocketFactory = new FreightRocketFactory();
freightRocketFactory.createPayload();
freightRocketFactory.createPayload();
freightRocketFactory.createStages();
let freightRocket =  freightRocketFactory.buildRocket();
console.log(freightRocket.payload)