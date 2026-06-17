- even if ts throws errors while transpiling to js, the js file still gets created

- by default ts treats every file js/ts in a single module, so declaring same named variables gets errors
    fix?
        -> use export {} in the file
        -> just create a tsconfig.json file in the project(no config)

- tsc --noEmit app.ts, without emitting the js files, just check if the file has errors(you can give multiple files also)
- tsc --noEmitOnError, skip emitting the js files if file has errors(you can give multiple files also)
-> these only works when the project has tsconfig.json, else it just gives instructions to configure tsconfig.json

- tsc --watch, watches all the ts files in the dir and transpiles them to js at each alteration

- the ts language service which provides the hover popover in realtime and the tsc compiler are 2 different things, even though they give almost same errors on-hover-in-ts-lang-service/on-transpile-with-tsc, the tsc lang service is designed to output in instance, while tsc takes time for actual transpilation, a second thing can also be said that ts-lang-service just do for the focused tab file while tsc do for all files thats how speed differs

-  tsc is called a compiler because it does much more than just convert TypeScript into JavaScript. Before generating code, it performs lexical analysis, parsing, type checking, semantic validation, module resolution, and error reporting. A transpiler only translates code from one high-level language to another, whereas tsc analyzes and validates the program before producing output. Since transpilation is only one phase of its overall compilation process, tsc is more accurately described as a source to source compiler rather than just a transpiler.