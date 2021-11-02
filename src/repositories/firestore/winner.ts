//import { onAuthStateChanged } from 'firebase/auth'
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { Winner } from '../../domain/WinnerModel'
import { db } from './firebase'

const winnerDoc = doc(db, 'winner', 'winner')

export const listUpdatesSubscription = (
  callbackFn: (winner: Winner) => void
) => {
  const unsubscribe = onSnapshot(winnerDoc, (doc) => {
    if (doc.data()) callbackFn(doc.data() as Winner)
  })
  return unsubscribe
}

export const update = async (winner: Winner): Promise<void> => {
  try {
    await updateDoc(winnerDoc, winner)
  } catch (e) {
    console.error('Error updating document: ', e)
    throw new Error('fail to update to db')
  }
}

export const remove = async (): Promise<void> => {
  try {
    await updateDoc(winnerDoc, { choiceId: '' })
  } catch (e) {
    console.error('Error updating document: ', e)
    throw new Error('fail to update to db')
  }
}
