import { combineReducers } from 'redux';
import ProductReducer from './products-reducer';


const rootReducer = combineReducers({
products:ProductReducer
});

export default rootReducer;