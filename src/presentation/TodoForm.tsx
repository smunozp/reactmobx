import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
//import * as todo from "../repositories/firestore/todos";
import { inject, observer } from 'mobx-react'
import TodoStore from '../domain/TodoStore'
import { Todo } from '../domain/TodoModel'

type FormType = 'edit' | 'add'
interface IPropsTodoForm {
  todoStore?: TodoStore
  type: FormType
  todo?: Todo
  changeSubmitStatus?: (newStatus: boolean) => void
}
interface IStateTodoForm {
  value: string
}

@inject('todoStore')
@observer
export default class TodoForm extends React.Component<
  IPropsTodoForm,
  IStateTodoForm
> {
  //const [value, setValue] = useState('')
  constructor(props: IPropsTodoForm) {
    super(props)

    if (this.props.type === 'add') {
      this.state = { value: '' }
    } else {
      this.state = { value: this.props.todo?.description || '' }
    }

    this.sumbitAction = this.sumbitAction.bind(this)
  }
  async sumbitAction(e: React.FormEvent<EventTarget>) {
    e.preventDefault()

    if (this.props.type === 'add') {
      const item = {
        description: this.state.value,
        done: false,
      }
      if (this.props.todoStore) await this.props.todoStore?.addTodo(item)
    } else {
      console.log('updating', this.props.todo?.id)
      if (this.props.todo?.id && this.props.todo) {
        const updatedToto: Todo = {
          id: this.props.todo.id,
          description: this.state.value,
          done: this.props.todo.done,
        }
        console.log('updating', JSON.stringify(updatedToto))
        if (this.props.todoStore)
          await this.props.todoStore?.updateTodo(updatedToto)
      }
      if (this.props.changeSubmitStatus) this.props.changeSubmitStatus(false)
    }
    this.setState({ value: '' })
  }
  render() {
    return (
      <form onSubmit={this.sumbitAction}>
        <TextField
          style={{ width: '100%' }}
          id='outlined-basic'
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          label={this.props.type === 'add' ? 'Add Todo' : 'Update Todo'}
          variant='outlined'
        />
      </form>
    )
  }
}
