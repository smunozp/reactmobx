import { action, makeObservable, observable } from 'mobx'
import * as winnerRepo from '../repositories/firestore/winner'
import { Winner } from './WinnerModel'

type winnerId = string

export default class SelectWinnerStore {
  winner: winnerId = ''

  constructor() {
    makeObservable(this, {
      winner: observable,

      updateWinner: action.bound,
      removeWinner: action.bound,
    })

    //this.updateTodosFromSuscription = this.updateTodosFromSuscription.bind(this)
  }

  updateWinnerFromSuscription(winner: Winner) {
    this.winner = winner.choiceId
  }

  suscribeToListChanges() {
    return winnerRepo.listUpdatesSubscription(this.updateWinnerFromSuscription)
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
