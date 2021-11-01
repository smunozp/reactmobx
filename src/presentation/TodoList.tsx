import React from 'react'
import TodoComponent from './Todo'
import Divider from '@material-ui/core/Divider'
import { Todo } from '../domain/TodoModel'
import TodoStore from '../domain/TodoStore'
import { inject, observer } from 'mobx-react'
//import { TodoStore } from '../domain/TodoStore'
@inject('todoStore')
@observer
export default class TodoList extends React.Component<
  { todoStore?: TodoStore },
  {}
> {
  async componentDidMount() {
    await this.props.todoStore?.getList()
  }
  render() {
    return (
      <>
        {this.props.todoStore?.todosList.map((todo: Todo) => (
          <React.Fragment key={todo.id}>
            <TodoComponent todo={todo} todoStore={this.props.todoStore} />
            <Divider />
          </React.Fragment>
        ))}
      </>
    )
  }
}
