import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import { inject, observer } from 'mobx-react'
import TodoStore from '../domain/TodoStore'
import WinnerStore from '../domain/WinerStore'

interface IPropsPickWinner {
  winnerStore?: WinnerStore
  todoStore?: TodoStore
}

const PickWinner = inject('winnerStore','todoStore' )(
  observer((props: IPropsPickWinner) => {
    return (
      <CardActions>
        <Button
          onClick={() => props.winnerStore?.chooseAWinner(props.todoStore?.todosList||[])}
          size='medium'
        >
          Pick a WINNER!!
        </Button>
        <Button onClick={() => props.winnerStore?.removeWinner()} size='medium'>
          Reset
        </Button>
      </CardActions>
    )
  })
)

export default PickWinner
