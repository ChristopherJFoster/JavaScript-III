/* The for principles of "this";
* in your own words. explain the four principles for the "this" keyword below.
*
* 1. Window/Global Object Binding:
In JavaScript, the `this` keyword always refers to an object. All JavaScript is insde the window/global object. When `this` is used and it it doesn't meet the criteria for either 2, 3, 4 below, `this` will refer to the window/global object.

* 2. Implicit Binding:
When a method (i.e., a function inside an object) employs the `this` keyword, `this` refers to the object of which the method is a part. This principle is useful when a method needs to refer to its own object or its object's properties.

* 3. New Binding:
A constructor function create new objects. When a constructor function is called using the `new` keyword, any `this` keyword that appears inside the constructor function refers to the object that is being created. This principle is useful when setting the properties of a new object.

* 4. Explicit Binding:
If JavaScript's call(), apply(), or bind() method is used, any `this` keyword in the invoked function will refer to the object supplied as the argument for the call()/apply()/bind(). Thus `this` is explicitly bound.

*
* write out a code example of each explanation above
*/

// Principle 1

// code example for Window Binding
console.log(this); // Displays a very large object in the console that contains a long list of JS objects, keywords, etc.

// Principle 2

// code example for Implicit Binding
const person1 = {
  name: "Randy",
  speak: function() {
    console.log(`Hi, my name is ${this.name}.`);
  }
};
person1.speak();

// Principle 3

function Person(attrs) {
  this.name = attrs.name;
  this.age = attrs.age;
  this.isCool = true;
  this.speak = function() {
    console.log(`Hi, my name is ${this.name}.`);
  };
}
const person2 = new Person({ name: "Sandy", age: 37 });
console.log(person2);

// code example for New Binding

// Principle 4

// code example for Explicit Binding

person1.speak.call(person2); // The speak() method uses this.name. Here, even though speak() is called from person1 (Randy), the `this` is bound to person2 (Sandy), so the consoel output is "Hi, my name is Sandy.".
