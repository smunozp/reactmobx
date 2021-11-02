//import { onAuthStateChanged } from 'firebase/auth'
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { Todo } from '../../domain/TodoModel'
import { db } from './firebase'

export type changeType = 'added' | 'modified' | 'removed'
const todosCol = collection(db, 'todos')

export const listUpdatesSubscription = (
  callbackFn: (data: Todo, id: string, change: changeType) => void
) => {
  const q = query(collection(db, 'todos'))
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      callbackFn(change.doc.data() as Todo, change.doc.id, change.type)
    })
  })
  return unsubscribe
}

// retrieve all todos
export const getAllTodos = async (): Promise<Array<Todo>> => {
  try {
    const snapshot = await getDocs(todosCol)
    const todos = await snapshot.docs.map((_data) => {
      return {
        id: _data.id, // because id field in separate function in firestore
        ..._data.data(), // the remaining fields
      }
    })

    // return and convert back it array of todo
    return todos as Array<Todo>
  } catch (e) {
    console.error('Error adding document: ', e)
    throw new Error('fail to add to db')
  }
}

// create a todo
export const create = async (todo: Todo): Promise<Todo> => {
  //const todosCol = collection(db, 'todos')
  try {
    const docRef = await addDoc(todosCol, {
      description: todo.description,
      done: todo.done,
    })
    return {
      id: docRef.id,
      ...todo,
    } as Todo
  } catch (e) {
    console.error('Error adding document: ', e)
    throw new Error('fail to add to db')
  }
  // return new created todo
}

// update a todo
export const update = async (id: string, todo: Todo): Promise<Todo> => {
  //await Firestore.collection(COLLECTION_NAME).doc(id).update(todo)

  const docTodos = doc(db, 'todos', id)
  try {
    await updateDoc(docTodos, {
      description: todo.description,
      done: todo.done,
    })
    return todo
  } catch (e) {
    console.error('Error updating document: ', e)
    throw new Error('fail to update to db')
  }
}

// delete a todo
export const remove = async (id: string): Promise<void> => {
  const docTodos = doc(db, 'todos', id)
  try {
    await deleteDoc(docTodos)
  } catch (e) {
    console.error('Error deleting document: ', e)
    throw new Error('fail to deleting to db')
  }
}
