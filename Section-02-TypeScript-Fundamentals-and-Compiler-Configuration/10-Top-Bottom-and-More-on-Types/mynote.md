- never is the subtype of every other type

- we can assign a never value to a variable of any type
'''
  let a:never
  let b:string = a
  let c:bigint = a
'''
this will not show error