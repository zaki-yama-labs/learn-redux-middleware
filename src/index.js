import { createStore, applyMiddleware } from 'redux';
import { addTodo } from './actions';
import todoApp from './reducers';

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

/*
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice();
  middlewares.reverse();

  let dispatch = store.dispatch;
  middlewares.forEach((middleware) => {
    dispatch = middleware(store)(dispatch);
  });

  return Object.assign({}, store, { dispatch });
}
*/

// const storeWithMiddlewares = applyMiddleware(store, [logger, crashReporter]);

const store = createStore(
  todoApp,
  applyMiddleware(logger, crashReporter),
);

store.dispatch(addTodo('Use Redux'));
