#### Undefined Vs Null in JavaScript

** Both undefined and null represent the absence of a meaningful value, but they have different purposes.
Undefined is a primitive value automatically assigned to variables in certain situations such as a variable that is declared but not initialized will have the value undefined.

** Null is a special value in JavaScript that represents the deliberate absence of any object value. It is often used to indicate "No Value" and explicitly shows that a variable or object property should have no value.

#### use of map() and forEach()

*** forEach() is used to perform side effects like logging or updating external variables. It does not return anything. map() is used for transforming data. It returns a new array with the transformed values, leaving the original array unchanged.

#### Different between == and ===

*** == is called the loose equality operator. It compares values only, and if the types are different, it tries to convert them to the same type before comparing.

*** === is called the strict equality operator. It compares both value and type, so no type conversion happens.


#### Significance of async/await

async/await is used to handle asynchronous tasks, like fetching data from an API.async marks a function as asynchronous and makes it return a promise.await pauses the function until the promise finishes, so your code can read in a simple, sequential way rather than using complex chains of callbacks or .then().
It makes code cleaner, easier to understand, and easier to handle errors.


#### Scope in JavaScript (Global, Function, Block)

Global scope, Variables declared outside everything. Accessible anywhere in program.Function scope ,Variables declared inside a function. Accessible only inside that function.Block scope: Variables declared inside { } using let or const. Accessible only inside that block.Scope determines where a variable can be seen and used.