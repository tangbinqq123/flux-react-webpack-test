import React from 'react';
import List from './List';
import CreateButton from './CreateButton';
import TodoStore from '../stores/TodoStore';
import TodoAction from '../actions/TodoAction';
import uuid from 'uuid';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: TodoStore.getAll()
    };
    this.createTodo = this.createTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // 在TodoStore上注册监听事件
  componentDidMount() {
    TodoStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      todos: TodoStore.getAll()
    });
  }

  // action生成器actionCreator
  // TodoAction.create方法直接分发(dispatch)出去
  createTodo() {
    TodoAction.create({ id: uuid.v4(), content: '3rd stuff' });
  }

  deleteTodo(id) {
    console.log(id);
    TodoAction.delete(id);
  }

  render() {
    return (
      <div>
        <List items={this.state.todos} onDelete={this.deleteTodo} />
        <CreateButton onClick={this.createTodo} />
      </div>
      );
  }

}

export default Todo;
