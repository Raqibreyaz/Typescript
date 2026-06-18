- before ts version-6,
  '''
  let a:number
  consoe.log(a)
  '''
  this will be compiled without any warning

- adding strict:true, now this will show errors like: usage of variable before assigning it

- ctrl+shift+p and select typescript version, it will show you the ts version usage in intellisense

- how to add new option for selecting the ts-version? download ts in that project, and it uses ts from node_modules

- strictNullCheck:true, shows error if a variable is used before assigning it

- strictNullChecks:false:
  '''
  let a: number = null
  let b:number = undefined
  '''
  this doesnt shows errors

- strictNullChecks:false:
  '''
  let a: number = 'raquib'
  '''
  this will show error like can't assing string to number, but not for null/undefined

- noImplicitAny:true
  '''
  function(name){
    console.log(name)
  }
  '''
  this will show error like 'name' is of any type

- noImplicitAny:true
  '''
  let x;
  console.log(x)
  '''
  this compiles cleanly without errors

- strict: true, marks many flags to true like the noImplicitAny,strictNullChecks etc

- in new versions of ts, strict is already true, even we set in tsconfig.json