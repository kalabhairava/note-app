// World's most useless application

const person = {
    name: 'Andrew'
};

person.age = 25;

debugger; // break-point

person.name = 'Mike';

console.log(person);

// works only in node v8 or greater
// run the program in debug mode => `node inspect fileName`. You can also use nodemon => `nodemon inspect fileName`.
// logs
// < Debugger listening on ws://127.0.0.1:9229/b81cf332-1d51-4b19-83a2-cdcb4af03a7e
// < For help see https://nodejs.org/en/docs/inspector
// Break on start in debugging.js:1
// > 1 (function (exports, require, module, __filename, __dirname) { // World's most useless application
// 2
// 3 const person =  

// Notice the wrapper function above
// All the code you write is wrapped inside the function => function (exports, require, module, __filename, __dirname)
// That is how you get access to variables like exports, require, etc
// console.log(__dirname); => log and check what each of those variables contain

//---------------------------------------
// Debugging commands
//---------------------------------------

// 1. list(numLines) => prints `numLine` lines above and below the place we have paused
// 2. n => stands for 'next'. Moves the execution to the next line
// 3. c => stands for 'continue'. Continues the execution until the next break-point (debugger statement), OR end of the program
// 4. CTRL + C twice (OR enter .exit) to exit the debug mode
// 5. repl => READ EVAL PRINT LOOP => kind of console in node environment. Lets you read the values of variables, etc
//              Type `repl` to enter REPL mode
// 6. debugger => puts a break-point. Type 'debugger' in the location inside the file where you want to stop the execution. 

//---------------------------------------
// Debugging via Chrome Dev Tools
//---------------------------------------

// 1. You don't have to remove 'debugger' statement from the code 
// 2. Run `node --inspect-brk fileName` => --inspect-brk is a flag. You can also use nodemon here
// 3. Fire up Chrome browser, and enter `chrome://inspect` in the URL bar
// 4. Click on 'Open dedicated DevTools for Node'
// 5. You can toggle the console in sources tab through ESC key
// 6. console is same as repl 