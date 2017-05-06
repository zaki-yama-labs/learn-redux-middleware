import React from 'react';
import FilterLink from '../containers/FilterLink';
import {
  SHOW_ALL,
  SHOW_ACTIVE,
  SHOW_COMPLETED,
} from '../constants/ActionTypes';

export default class FilterLinkList extends React.Component {
  render() {
    return (
      <p>
        Show:
        {' '}
        <FilterLink filter={SHOW_ALL}>
          All
        </FilterLink>
        {', '}
        <FilterLink filter={SHOW_ACTIVE}>
          Active
        </FilterLink>
        {', '}
        <FilterLink filter={SHOW_COMPLETED}>
          Completed
        </FilterLink>
      </p>
    );
  }
}
