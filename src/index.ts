import { Container } from "./container";

interface ISugar { glaze(): void; }
interface IFlour { addFlour(): void; }
interface IBaked { inTwoMinutes(): void; }

class sugarAndBatter implements ISugar {
    public glaze(): void {
        console.log('Sugar');
    }   
}

class flourAndMixture implements IFlour {
    public addFlour(): void {
        console.log('Testing Flour Mixture');
    }   
}

class Baked implements IBaked {
    constructor(private sugarAndBatter: ISugar, private flourAndMixture: IFlour) {}

    public inTwoMinutes(): void {
        this.sugarAndBatter.glaze();
        this.flourAndMixture.addFlour();
        console.log('Depends on Sugar and Flour');
    }   
}

let cup = Container.getInstance;

//injecting the dependency
cup.inject("ISugar", [], sugarAndBatter); // no Dependency
cup.inject("IFlour", ['ISugar'], flourAndMixture); // Depends on ISugar
cup.inject("IBaked", ["ISugar", "IFlour"], Baked); // Depends on both ISugar and IFlour
// cup.inject("IBaked", ["ISugar", "IBaked"], Baked); // Circular/Cyclical - happy to receive feedback.

let base = cup.bind<ISugar>("ISugar");
let mixture = cup.bind<IFlour>("IFlour");
let readyToServe = cup.bind<IBaked>("IBaked");

base.glaze();
mixture.addFlour();
console.log('...');
readyToServe.inTwoMinutes();