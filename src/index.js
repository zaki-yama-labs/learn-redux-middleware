import { createStore } from 'redux';
import { addTodo } from './actions';
import todoApp from './reducers';

const store = createStore(todoApp);

// Log the initial state
console.log(store.getState());

function dispatchAndLog(store, action) {
  console.log('dispatching', action);
  store.dispatch(action);
  console.log('next state', store.getState());
}

dispatchAndLog(store, addTodo('Use Redux'));
