/* Inspired by "Design Patterns in TypeScript [2018]" */

export class Container {
    private static instance: Container = new Container();
    private dependencies: {[key: string]: Object} = {};

    //private constructor: to prevent instantiation using 'new'.
    private constructor() {
        if(Container.instance) {
            throw new Error("Singleton. This class cannot have multiple instances.")
        }
        Container.instance = this;
    }

    public static get getInstance(): Container {
        return Container.instance;
    }

    inject(name: string, dependencies: string[], implementation: any) {
        if(this.dependencies[name]) {
            throw new Error("Dependency already registered")
        }
        let implementedDependencies = this.getImplementedDependencies(dependencies);
        this.dependencies[name] = new implementation(...implementedDependencies);
    }

    bind<T>(name: string): T {
        if(!this.dependencies[name]) {
            throw new Error(`Unresolved dependency ${name}`)
        }
        // console.log(this.dependencies[name] as T);
        return this.dependencies[name] as T; 
    }

    private getImplementedDependencies(names: string[]): Object[] {
        return names.map(name => this.bind(name));
    }
}