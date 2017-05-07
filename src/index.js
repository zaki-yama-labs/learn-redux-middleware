import { createStore } from 'redux';
import { addTodo } from './actions';
import todoApp from './reducers';

const store = createStore(todoApp);

// Log the initial state
console.log(store.getState());

/*
function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      return result;
    }
  }
}
*/

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

function applyMiddlewareByMonkeypatching(store, middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  middlewares.forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  });
}

// Dummy
const Raven = {
  captureException: function(err, optional) {
    console.error(err);
    console.log(optional);
  },
};

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState(),
      },
    });
    throw err;
  }
}

applyMiddlewareByMonkeypatching(store, [logger, crashReporter]);

store.dispatch(addTodo('Use Redux'));
