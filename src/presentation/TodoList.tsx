import React from 'react'
import TodoComponent from './Todo'
import Divider from '@material-ui/core/Divider'
import { Todo } from '../domain/TodoModel'
import TodoStore from '../domain/TodoStore'
import { inject, observer } from 'mobx-react'
import { Unsubscribe } from '@firebase/util'
import WinnerStore from '../domain/WinnerStore'
//import { TodoStore } from '../domain/TodoStore'

interface IPropsTodoList {
  todoStore?: TodoStore
  winnerStore?: WinnerStore
}
interface IStateTodoList {}
@inject('todoStore', 'winnerStore')
@observer
export default class TodoList extends React.Component<
  IPropsTodoList,
  IStateTodoList
> {
  private _unsubscribeTodo: Unsubscribe | undefined
  private _unsubscribeWinner: Unsubscribe | undefined
  async componentDidMount() {
    if (this.props.todoStore) {
      //await this.props.todoStore?.getList()
      this._unsubscribeTodo = this.props.todoStore?.subscribeToListChanges()
      this._unsubscribeWinner = this.props.winnerStore?.subscribeToListChanges()
    }
  }

  async componentWillUnmount() {
    if (this._unsubscribeTodo) this._unsubscribeTodo()
    if (this._unsubscribeWinner) this._unsubscribeWinner()
  }
  render() {
    return (
      <>
        {this.props.todoStore?.todosList.map((todo: Todo) => {
         
          return (
            <React.Fragment key={todo.id}>
              <TodoComponent
                todo={todo}
                todoStore={this.props.todoStore}
                isWinner={todo.id === this.props.winnerStore?.winner}
              />
              <Divider />
            </React.Fragment>
          )
        })}
      </>
    )
  }
}
