class Employee {
    private _name : string;
    private _age : number;
    private _job : string;

    constructor(name: string, age: number, job: string) {
        this._name = name;
        this._age = age;
        this._job = job;
    }
    
    set name(name : string) {
        this._name = name;
    }

    set age(age  : number) {
        this._age = age;
    }

    set job(job : string) {
        this._job = job;
    }

    get name() {
        return this._name;
    }

    get age() {
        return this._age;
    }

    get job() {
        return this._job;
    }

    printProperties() : void {
        console.log(this._name)
        console.log(this._age);
        console.log(this._job);
    }


}



let e1 = new Employee("jino", 25, "jogyo");
e1.printProperties()
