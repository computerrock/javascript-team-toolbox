# @computerrock/cra-template-bare-app

This is custom react app template you can use to quickly bootstrap new project with latest React configuration.


## Getting started 

Modify `package.json` and `README.md` files  according to you project specification. Application specific 
code should be placed in `./src` folder. For more detailed explanation please consult `Project setup` document 
you can find in JavaScript team guides. 


## Development builds

In project root create `.env.development` file (see `.env.example` for reference). Then run:

```shell
$ npm install # to install project dependencies
$ npm start # to start the app with development environment settings
$ npm test # to run Jest test suite (in separate terminal)
```

If `PORT` *.env* value is same as in the example configuration, application will be accessible 
at [http://localhost:11000](http://localhost:11000/) 


## Production build

In project root create `.env.production` file (see `.env.example` for reference). Then run:

```bash
$ npm install # to install project dependencies
$ npm run build # to build the app with production environment settings
```

Files prepared for deployment will be placed in `./build` folder. 
