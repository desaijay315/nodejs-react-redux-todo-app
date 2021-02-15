import reduceReducers from 'reduce-reducers';

import initialState from './initialState';
import TodosReducer from './Todos';

const AppReducer = reduceReducers(initialState, TodosReducer);

export default AppReducer;
