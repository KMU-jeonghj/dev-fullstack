var Employee = /** @class */ (function () {
    function Employee(name, age, job) {
        this._name = name;
        this._age = age;
        this._job = job;
    }
    Object.defineProperty(Employee.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (age) {
            this._age = age;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "job", {
        get: function () {
            return this._job;
        },
        set: function (job) {
            this._job = job;
        },
        enumerable: false,
        configurable: true
    });
    Employee.prototype.printProperties = function () {
        console.log(this._name);
        console.log(this._age);
        console.log(this._job);
    };
    return Employee;
}());
var e1 = new Employee("jino", 25, "jogyo");
e1.printProperties();
