import React from 'react'
import Switch from '@material-ui/core/Switch'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import './Todo.scss'
import * as todoRepo from '../repositories/firestore/todos'
import { observer } from 'mobx-react'

const Todo = observer((props: any) => {
  const { todo, todoStore } = props
  const updateTodo = () => {
    todoStore.updateTodo({
      id: todo.id,
      description: todo.description,
      done: !todo.done,
    })
  }
  return (
    <div className='Todo'>
      <Switch
        edge='end'
        checked={todo.done}
        onChange={updateTodo}
        inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
      />
      <p>{todo.description}</p>
      <IconButton aria-label='delete' onClick={(e) => todoRepo.remove(todo.id)}>
        <DeleteIcon fontSize='large' />
      </IconButton>
    </div>
  )
})
export default Todo
