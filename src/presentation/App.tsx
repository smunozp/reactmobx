import React from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Container from '@material-ui/core/Container'
import CardContent from '@material-ui/core/CardContent'
import './App.scss'
import { Provider } from 'mobx-react'
import TodoStore from '../domain/TodoStore'
import WinnerStore from '../domain/WinnerStore'
import { Card } from '@material-ui/core'
import PickWinner from './PickWinner'
import { configure } from 'mobx'

configure({
  enforceActions: 'never',
})

const stores = {
  todoStore: new TodoStore(),
  winnerStore: new WinnerStore(),
}

function App() {
  return (
    <div className='App'>
      <Container className='conatiner' maxWidth='sm'>
        <Provider {...stores}>
          <Card>
            <CardContent>
              <h3>Select a RANDOM winner from a list App</h3>
              <TodoForm type='add' />
              <TodoList />
            </CardContent>
            <PickWinner />
          </Card>
        </Provider>
      </Container>
    </div>
  )
}

export default App
