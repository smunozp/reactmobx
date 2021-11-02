import React from 'react'
import TodoComponent from './Todo'
import Divider from '@material-ui/core/Divider'
import { Todo } from '../domain/TodoModel'
import TodoStore from '../domain/TodoStore'
import { inject, observer } from 'mobx-react'
import { Unsubscribe } from '@firebase/util'
//import { TodoStore } from '../domain/TodoStore'
@inject('todoStore')
@observer
export default class TodoList extends React.Component<
  { todoStore?: TodoStore },
  {}
> {
  private _unsubscribe: Unsubscribe | undefined
  async componentDidMount() {
    if (this.props.todoStore) {
      await this.props.todoStore?.getList()
      this._unsubscribe = this.props.todoStore?.suscribeToListChanges()
    }
  }

  async componentWillUnmount() {
    if (this._unsubscribe) this._unsubscribe()
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
