- tsconfig.json is by default only works for ts files, while jsconfig.json is only for js files

- we can configure tsconfig.json to work for js files too, 'allowjs','checkJs' etc

- es6 and es2015 are same

- removeComments:true, by default it is false
- noEmitOnError: true
- pretty: true, by defaults to 'true' which prettifies the coming error
- outDir: 'dist', emitted files will go to this dir
- watch: true, it only works in terminal, also it tracks changes of tsconfig.json too!

- when only one directory present then it becomes the common source directory, whether 'src' or any other name

- outDir:'dist', it will show error if no ts file or >1 dirs exists having ts files at '.' level,
why? as in this case common source becomes './src' automatically
then? we will have to give the rootDir as the dir which is used for ts, like rootDir: 'src' or either set rootDir explicitly