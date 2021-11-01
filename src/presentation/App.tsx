import React from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import './App.scss'

import { Provider } from 'mobx-react'

import TodoStore from '../domain/TodoStore'

const todoStore = new TodoStore()

function App() {
  return (
    <div className='App'>
      <Container className='conatiner' maxWidth='sm'>
        <Card>
          <CardContent>
            <h3>Select a RANDOM winner from a list App</h3>
            <Provider todoStore={todoStore}>
              <TodoForm type ="add" />
              <TodoList />
            </Provider>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default App
