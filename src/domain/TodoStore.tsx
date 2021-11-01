import { action, makeObservable, observable } from 'mobx'
import { Todo } from './TodoModel'
import * as todoRepo from '../repositories/firestore/todos'

export default class TodoStore {
  todosList: Array<Todo> = []

  constructor() {
    makeObservable(this, {
      todosList: observable,
      addTodo: action.bound,
      getList: action.bound,
      updateTodo: action.bound,
      remove: action.bound,
    })
  }

  async addTodo(todo: Todo) {
    try {
      const todoAdded = await todoRepo.create(todo)
      this.todosList.push(todoAdded)
    } catch (error) {
      throw error
    }
  }
  async getList(): Promise<Array<Todo>> {
    try {
      const todoAdded = await todoRepo.getAllTodos()
      this.todosList = todoAdded
      return todoAdded
    } catch (error) {
      throw error
    }
  }

  async updateTodo(todo: Todo) {
    try {
      if (todo.id) {
        const todoUpdated = await todoRepo.update(todo.id, todo)

        const objIndex = this.todosList.findIndex((obj) => obj.id === todo.id)
        this.todosList[objIndex] = todoUpdated
      } else {
        throw new Error('cant update')
      }
    } catch (error) {
      throw error
    }
  }
  async remove(id: string): Promise<void> {
    try {
      await todoRepo.remove(id)
      this.todosList = this.todosList.filter((todo) => todo.id !== id)
    } catch (error) {
      throw error
    }
  }
}
