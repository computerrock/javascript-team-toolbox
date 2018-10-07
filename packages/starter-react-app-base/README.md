# starter-react-app-base

This is a starter pack that you can use to quickly bootstrap new project with latest React configuration.


## Getting started 

Copy the contents of this folder into new project folder. Modify `package.json` and `README.md` files  according 
to you project specification. Application specific code should be placed in `./src` folder. For more detailed 
explanation please consult with [`Project setup`](../../project-setup.md) document. 


## Development builds

Then in project root create 
`.env.development` file (see `.env.example` for reference). Then run:

```bash
$ npm start # to start the app
$ npm test # to run Jest test suite (in separate terminal)
```

If `PORT` *.env* value is same as in the example configuration, application will be accessible 
at [http://localhost:3000](http://localhost:3000/) 


## Production build

To build application for production, run:

```bash
$ npm build
```
