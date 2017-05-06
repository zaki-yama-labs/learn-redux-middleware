import React from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import FilterLinkList from '../components/FilterLinkList';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <FilterLinkList />
      </div>
    );
  }
}

