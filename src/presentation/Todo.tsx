import React from 'react'
import Switch from '@material-ui/core/Switch'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import './TodoStyle.scss'
import { inject, observer } from 'mobx-react'
import TodoStore from '../domain/TodoStore'
import { Todo } from '../domain/TodoModel'

interface IPropsTodo {
  todoStore?: TodoStore
  todo: Todo
}
interface IStateTodo {}

@inject('todoStore')
@observer
export default class TodoComponent extends React.Component<
  IPropsTodo,
  IStateTodo
> {
  constructor(props: IPropsTodo) {
    super(props)
    //this.state = { value: '' }
    this.updateTodo = this.updateTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
  }

  async updateTodo() {
    if (this.props.todoStore)
      this.props.todoStore.updateTodo({
        id: this.props.todo.id,
        description: this.props.todo.description,
        done: !this.props.todo.done,
      })
  }
  async removeTodo() {
    if (this.props.todoStore && this.props.todo.id)
      this.props.todoStore.remove(this.props.todo.id)
  }
  render() {
    return (
      <div className='Todo'>
        <Switch
          edge='end'
          checked={this.props.todo.done}
          onChange={this.updateTodo}
          inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
        />
        <p>{this.props.todo.description}</p>
        <IconButton aria-label='delete' onClick={() => this.removeTodo()}>
          <DeleteIcon fontSize='large' />
        </IconButton>
      </div>
    )
  }
}
