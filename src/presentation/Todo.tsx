import React from 'react'
import Switch from '@material-ui/core/Switch'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import './TodoStyle.scss'
import { inject, observer } from 'mobx-react'
import TodoStore from '../domain/TodoStore'
import { Todo } from '../domain/TodoModel'
import TodoForm from './TodoForm'

interface IPropsTodo {
  todoStore?: TodoStore
  todo: Todo
}
interface IStateTodo {
  onEdit: boolean
}

@inject('todoStore')
@observer
export default class TodoComponent extends React.Component<
  IPropsTodo,
  IStateTodo
> {
  private _mounted: boolean
  constructor(props: IPropsTodo) {
    super(props)
    this._mounted = false
    this.state = { onEdit: false }
    this.updateTodo = this.updateTodo.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.changeSubmitStatus = this.changeSubmitStatus.bind(this)
  }
  componentDidMount() {
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
    this.setState = (state, callback) => {
      return
    }
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
  changeSubmitStatus(newStatus: boolean) {
    if (this._mounted) this.setState({ onEdit: newStatus })
  }
  render() {
    return (
      <div>
      
      
        {!this.state.onEdit && (
          <div className='Todo'>
            <p>{this.props.todo.description}</p>

            <IconButton
              aria-label='edit'
              onClick={() => this.setState({ onEdit: true })}
            >
              <EditIcon fontSize='large' />
            </IconButton>
            <IconButton aria-label='delete' onClick={() => this.removeTodo()}>
              <DeleteIcon fontSize='large' />
            </IconButton>
          </div>
        )}
        {this.state.onEdit && (
          <TodoForm
            type='edit'
            todo={this.props.todo}
            changeSubmitStatus={this.changeSubmitStatus}
          />
        )}
      </div>
    )
  }
}
