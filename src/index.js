import { createStore } from 'redux';
import { addTodo } from './actions';
import todoApp from './reducers';

const store = createStore(todoApp);

// Log the initial state
console.log(store.getState());

let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

store.dispatch(addTodo('Use Redux'));
