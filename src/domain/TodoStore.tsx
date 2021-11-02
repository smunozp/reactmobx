import { makeObservable, observable } from 'mobx'
import { Todo } from './TodoModel'
import * as todoRepo from '../repositories/firestore/todos'
import { changeType } from '../repositories/firestore/todos'

export default class TodoStore {
  todosList: Array<Todo> = []

  constructor() {
    makeObservable(this, {
      todosList: observable,
    })

    this.updateTodosFromSuscription = this.updateTodosFromSuscription.bind(this)
  }

  updateTodosFromSuscription(data: Todo, id: string, change: changeType) {
    if (change === 'added') {
      this.todosList.push({ id: id, ...data })
    }
    if (change === 'modified') {
      const objIndex = this.todosList?.findIndex((obj) => obj.id === id)
      const todoUpdated = { id: id, ...data }
      //console.log('todoUpdated', todoUpdated)
      this.todosList[objIndex] = todoUpdated
    }
    if (change === 'removed') {
      this.todosList = this.todosList.filter((todo) => todo.id !== id)
    }
  }

  subscribeToListChanges() {
    return todoRepo.listUpdatesSubscription(this.updateTodosFromSuscription)
  }

  async addTodo(todo: Todo) {
    try {
      await todoRepo.create(todo)
    } catch (error) {
      throw error
    }
  }

  async updateTodo(todo: Todo) {
    try {
      if (todo.id) {
        await todoRepo.update(todo.id, todo)
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
    } catch (error) {
      throw error
    }
  }
}
