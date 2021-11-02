import { makeObservable, observable } from 'mobx'
import * as winnerRepo from '../repositories/firestore/winner'
import { Todo } from './TodoModel'
import { Winner } from './WinnerModel'

type winnerId = string

export default class WinnerStore {
  winner: winnerId = ''

  constructor() {
    makeObservable(this, {
      winner: observable,
    })
    this.updateWinnerFromSubscription =
      this.updateWinnerFromSubscription.bind(this)
  }
  async chooseAWinner(todoList: Array<Todo>) {
    //console.log('choosing a winner', JSON.stringify(todoList))
    const winnerIndex = Math.floor(Math.random() * todoList.length)
    //console.log('choosing a winner', winnerIndex)
    if (todoList[winnerIndex].id !== undefined) {
      const newWinner = todoList[winnerIndex].id as string
      await this.updateWinner({ choiceId: newWinner })
    }
  }

  updateWinnerFromSubscription(newWinner: Winner) {
    if (newWinner) this.winner = newWinner.choiceId
  }

  subscribeToListChanges() {
    return winnerRepo.listUpdatesSubscription(this.updateWinnerFromSubscription)
  }

  async updateWinner(winner: Winner) {
    try {
      await winnerRepo.update(winner)
    } catch (error) {
      throw error
    }
  }
  async removeWinner(): Promise<void> {
    try {
      await winnerRepo.remove()
    } catch (error) {
      throw error
    }
  }
}
