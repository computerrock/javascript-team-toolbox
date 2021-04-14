import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

// combine application reducers
const createRootReducer = history => combineReducers({
    router: connectRouter(history),
});

export default createRootReducer;
