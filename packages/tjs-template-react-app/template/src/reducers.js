// import authOIDC from './auth/authOIDC';
// import authOAuth2 from './auth/authOAuth2';
import applicationReducer from './application/applicationReducer';

// application reducers
const reducers = {
    application: applicationReducer,
    // ...authOIDC.reducer,
    // ...authOAuth2.reducer,
};

export default reducers;
