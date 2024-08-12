// SINGLETON PATTERN
class Singleton {
    static #instance = null;
  
    constructor() {
      if (Singleton.#instance) {
        throw new Error('Cannot instantiate directly. Use Singleton.getInstance() instead.');
      }
      this.value = Math.random(); 
    }
  
    static getInstance() {
      if (!Singleton.#instance) {
        Singleton.#instance = new Singleton();
      }
      return Singleton.#instance;
    }
  }
  
  // Usage
  const instance1 = Singleton.getInstance();
  console.log(instance1.value); 
  
  const instance2 = Singleton.getInstance();
  console.log(instance2.value);

//   Factory method
  
  
  class Vehicle {
    create() {
      throw new Error('This method should be overridden!');
    }
  }
  
  class Car extends Vehicle {
    create() {
      return 'Car created';
    }
  }
  
  class Bike extends Vehicle {
    create() {
      return 'Bike created';
    }
  }
  
  class VehicleFactory {
    static getVehicle(type) {
      switch (type) {
        case 'car':
          return new Car();
        case 'bike':
          return new Bike();
        default:
          throw new Error('Unknown vehicle type');
      }
    }
  }
  
  // Usage
  const car = VehicleFactory.getVehicle('car');
  console.log(car.create()); // 'Car created'
  
  const bike = VehicleFactory.getVehicle('bike');
  console.log(bike.create()); // 'Bike created'

//   STRUCTURAL PATTERN
//   adapter

  class OldSystem {
    request() {
      return 'Old system request';
    }
  }
  
  class NewSystem {
    specificRequest() {
      return 'New system request';
    }
  }
  
  class Adapter {
    constructor(newSystem) {
      this.newSystem = newSystem;
    }
  
    request() {
      return this.newSystem.specificRequest();
    }
  }
  
  // Usage
  const oldSystem = new OldSystem();
  console.log(oldSystem.request()); // 'Old system request'
  
  const newSystem = new NewSystem();
  const adapter = new Adapter(newSystem);
  console.log(adapter.request()); // 'New system request'

//   Decorator pattern
class Coffee {
    cost() {
      return 5;
    }
  }
  
  class MilkDecorator {
    constructor(coffee) {
      this.coffee = coffee;
    }
  
    cost() {
      return this.coffee.cost() + 2;
    }
  }
  
  class SugarDecorator {
    constructor(coffee) {
      this.coffee = coffee;
    }
  
    cost() {
      return this.coffee.cost() + 1;
    }
  }
  
  // Usage
  const coffee = new Coffee();
  console.log(coffee.cost()); // 5
  
  const milkCoffee = new MilkDecorator(coffee);
  console.log(milkCoffee.cost()); // 7
  
  const milkSugarCoffee = new SugarDecorator(milkCoffee);
  console.log(milkSugarCoffee.cost()); // 8

//   composite pattern
  class Leaf {
    constructor(name) {
      this.name = name;
    }
  
    getName() {
      return this.name;
    }
  }
  
  class Composite {
    constructor() {
      this.children = [];
    }
  
    add(child) {
      this.children.push(child);
    }
  
    getNames() {
      return this.children.map(child => child.getName());
    }
  }
  
  // Usage
  const leaf1 = new Leaf('Leaf 1');
  const leaf2 = new Leaf('Leaf 2');
  
  const composite = new Composite();
  composite.add(leaf1);
  composite.add(leaf2);
  
  console.log(composite.getNames()); // ['Leaf 1', 'Leaf 2']

//   FACADE PATTERN
  class Computer {
    start() {
      return 'Computer started';
    }
  }
  
  class Monitor {
    turnOn() {
      return 'Monitor turned on';
    }
  }
  
  class ComputerFacade {
    constructor() {
      this.computer = new Computer();
      this.monitor = new Monitor();
    }
  
    startSystem() {
      return `${this.monitor.turnOn()} and ${this.computer.start()}`;
    }
  }
  
  // Usage
  const facade = new ComputerFacade();
  console.log(facade.startSystem()); // 'Monitor turned on and Computer started'
  

//   BEHAVIOURAL PATTERN
//   OBSERVER PATTERN
  // Subject class
class Subject {
    constructor() {
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    notifyObservers(message) {
      this.observers.forEach(observer => observer.update(message));
    }
  }
  
  // Observer class
  class Observer {
    constructor(name) {
      this.name = name;
    }
  
    update(message) {
      console.log(`${this.name} received: ${message}`);
    }
  }
  
  // Usage
  const subject = new Subject();
  
  const observer1 = new Observer('Observer 1');
  const observer2 = new Observer('Observer 2');
  const observer3 = new Observer('Observer 3');
  
  // Add observers to the subject
  subject.addObserver(observer1);
  subject.addObserver(observer2);
  subject.addObserver(observer3);
  
  // Notify all observers
  subject.notifyObservers('Hello Observers!');
  
  // Base Handler
class Handler {
    constructor(nextHandler = null) {
      this.nextHandler = nextHandler;
    }
  
    handle(request) {
      if (this.nextHandler) {
        return this.nextHandler.handle(request);
      }
      return 'No handler available for this request.';
    }
  }
  
  // Concrete Handlers
  class LowLevelHandler extends Handler {
    handle(request) {
      if (request === 'low') {
        return 'Handled by LowLevelHandler';
      }
      return super.handle(request);
    }
  }
  
  class MediumLevelHandler extends Handler {
    handle(request) {
      if (request === 'medium') {
        return 'Handled by MediumLevelHandler';
      }
      return super.handle(request);
    }
  }
  
  class HighLevelHandler extends Handler {
    handle(request) {
      if (request === 'high') {
        return 'Handled by HighLevelHandler';
      }
      return super.handle(request);
    }
  }
  
  // Set Up the Chain
  const highLevelHandler = new HighLevelHandler();
  const mediumLevelHandler = new MediumLevelHandler(highLevelHandler);
  const lowLevelHandler = new LowLevelHandler(mediumLevelHandler);
  
  // Usage
  console.log(lowLevelHandler.handle('low'));    // 'Handled by LowLevelHandler'
  console.log(lowLevelHandler.handle('medium')); // 'Handled by MediumLevelHandler'
  console.log(lowLevelHandler.handle('high'));   // 'Handled by HighLevelHandler'
  console.log(lowLevelHandler.handle('unknown')); // 'No handler available for this request.'

  // ITERATOR PATTERN
class Iterator {
    constructor(collection) {
      this.collection = collection;
      this.index = 0;
    }
  
    hasNext() {
      return this.index < this.collection.length;
    }
  
    next() {
      if (this.hasNext()) {
        return this.collection[this.index++];
      } else {
        throw new Error('No more elements');
      }
    }
  }
  
  // Collection
  class Collection {
    constructor() {
      this.items = [];
    }
  
    add(item) {
      this.items.push(item);
    }
  
    getIterator() {
      return new Iterator(this.items);
    }
  }
  
  // Usage
  const collection = new Collection();
  collection.add('Item 1');
  collection.add('Item 2');
  collection.add('Item 3');
  
  const iterator = collection.getIterator();
  
  while (iterator.hasNext()) {
    console.log(iterator.next());
  }
  // Command Pattern
//   interface
class Command {
    execute() {
      throw new Error('Execute method must be implemented');
    }
  }
  
  // Concrete Commands
  class LightOnCommand extends Command {
    constructor(light) {
      super();
      this.light = light;
    }
  
    execute() {
      this.light.turnOn();
    }
  }
  
  class LightOffCommand extends Command {
    constructor(light) {
      super();
      this.light = light;
    }
  
    execute() {
      this.light.turnOff();
    }
  }
  
  class TVOnCommand extends Command {
    constructor(tv) {
      super();
      this.tv = tv;
    }
  
    execute() {
      this.tv.turnOn();
    }
  }
  
  class TVOffCommand extends Command {
    constructor(tv) {
      super();
      this.tv = tv;
    }
  
    execute() {
      this.tv.turnOff();
    }
  }
  
  // Receivers
  class Light {
    turnOn() {
      console.log('Light is ON');
    }
  
    turnOff() {
      console.log('Light is OFF');
    }
  }
  
  class TV {
    turnOn() {
      console.log('TV is ON');
    }
  
    turnOff() {
      console.log('TV is OFF');
    }
  }
  
  // Invoker
  class RemoteControl {
    constructor() {
      this.command = null;
    }
  
    setCommand(command) {
      this.command = command;
    }
  
    pressButton() {
      this.command.execute();
    }
  }
  
  // Usage
  const light = new Light();
  const tv = new TV();
  
  const lightOn = new LightOnCommand(light);
  const lightOff = new LightOffCommand(light);
  const tvOn = new TVOnCommand(tv);
  const tvOff = new TVOffCommand(tv);
  
  const remote = new RemoteControl();
  
  remote.setCommand(lightOn);
  remote.pressButton(); // Output: Light is ON
  
  remote.setCommand(lightOff);
  remote.pressButton(); // Output: Light is OFF
  
  remote.setCommand(tvOn);
  remote.pressButton(); // Output: TV is ON
  
  remote.setCommand(tvOff);
  remote.pressButton(); // Output: TV is OFF
  
  
 
  
  
  
  
  