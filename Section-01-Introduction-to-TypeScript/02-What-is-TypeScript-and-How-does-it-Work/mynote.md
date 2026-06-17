- even we dont have installed typescript, we get it preinstalled in vs code, which works for the intellisense thing for js files

- actually, for showing js/ts intellisense, vs code starts a typescript server which on hovering to a function or a variable returns a json response having the data to show in the hovered popover

- ts lang service uses custom json-based protocol called typescript server protocol, and it runs over Nodejs IPC using Stdio streams

- these json responses can be seen in the vs-code's terminal's output tab by selectin typescript in the 'select' box and 'strace' in the gear icon

- we can also edit the text shown in the popover hover, by going in the file of the process working on that hover effect data, usually we get it's path between '--max-old-space-size=3072' and '--useInferredProjectPerProjectRoot', in the 'lib' folder try to alter the contents of something es5.d.ts named file

- so what this is, is it the ts compiler? no, it is typescript service, which is more lightweight and especially built for intellisense

- so like ts service, do we have another services for another syntaxes like html, css, java? yes!

- we can run nodejs code, with native vs-code's code. i mean without using nodejs we can run nodejs code just by the vs-code's executable

- ELECTRON_RUN_AS_NODE=1 [vs-code executable path] app.js

- we can use //@ts-check at the top of a js file to make it work as a typescript file

- like tsconfig.json to configure ts settings, we can also configure for js in jsconfig.json and it will give ts like errors