import React, { PropTypes } from 'react';

export default class AddTodoForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const node = this.refs.input;
    const text = node.value.trim();
    if (!text) {
      return;
    }
    this.props.onSubmit(text);
    node.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input ref="input" />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    );
  }
}

AddTodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
