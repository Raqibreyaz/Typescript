- since we can directly run ts files using node, so we can directly debug them using node

- but what about browser?
a workaround is to compile the ts file and then debug the js file

- but debugging from compiled js will feel odd, as compiled js could be very compact and may have less code, we can do it using sourceMap:true

- it generates a file app.js.map and adds a line at then end of app.js
//# sourceMappingURL=app.js.map
which dev tools can fetch to map js with ts

- now in console, i found that console.log are shown from ts file!