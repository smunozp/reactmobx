import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
//import * as todo from "../repositories/firestore/todos";
import { inject, observer } from 'mobx-react'
import TodoStore from '../domain/TodoStore'

interface IPropsTodoForm {
  todoStore?: TodoStore
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
    this.state = { value: '' }
    this.createTodo = this.createTodo.bind(this)
  }
  async createTodo(e: React.FormEvent<EventTarget>) {
    e.preventDefault()
    const item = {
      description: this.state.value,
      done: false,
    }
    if (this.props.todoStore) await this.props.todoStore?.addTodo(item)
    this.setState({ value: '' })
  }
  render() {
    return (
      <form onSubmit={this.createTodo}>
        <TextField
          style={{ width: '100%' }}
          id='outlined-basic'
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          label='Add Todo'
          variant='outlined'
        />
      </form>
    )
  }
}
