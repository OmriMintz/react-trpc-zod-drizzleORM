import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ClearIcon from '@mui/icons-material/Clear'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined'
import { Button, Checkbox } from '@mui/material'
import { FC } from 'react'
import styled from 'styled-components'

import type { ITodo } from '../../../server/src/type'

interface ITodoItemProps extends ITodo {
   toggleTodo: (id: number) => void
   removeTodo: (id: number) => void
}

export const TodoItem: FC<ITodoItemProps> = props => {
   const { id, name, isCompleted, toggleTodo, removeTodo } = props

   const completed = isCompleted

   return (
      <TodoItemWrapper data-testid="todo-item" className={`${completed && 'completed'}`}>
         <Checkbox
            disableRipple
            checked={completed}
            icon={<UncheckedIcon fontSize="small" />}
            checkedIcon={<CheckedIcon fontSize="small" />}
            onChange={() => toggleTodo(id)}
         />
         <TodoText $isChecked={completed}>{name}</TodoText>

         <DeleteButton
            sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            disableRipple
            onClick={() => removeTodo(id)}
         >
            <DeleteIcon fontSize="small" />
         </DeleteButton>
      </TodoItemWrapper>
   )
}

const UncheckedIcon = styled(RadioButtonUncheckedOutlinedIcon)`
   color: ${props => props.theme.colors.primary};
`

const CheckedIcon = styled(CheckCircleOutlineIcon)`
   color: ${props => props.theme.colors.success};
`

const DeleteIcon = styled(ClearIcon)`
   color: ${props => props.theme.colors.danger};
`

const Input = styled.input`
   width: 100%;
   border: none;
   font-size: 16px;
   background-color: ${props => props.theme.colors.secondary};
`

const DeleteButton = styled(Button)`
   && {
      background-color: transparent;
      color: ${props => props.theme.colors.danger};
      padding: 5px;
      margin: 0;
      display: none;
      &:hover {
         background-color: 'transparent';
      }
   }
`

const TodoItemWrapper = styled.div`
   height: 48px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-bottom: 8px;
   padding-bottom: 8px;
   border-bottom: 1px solid ${props => props.theme.colors.primary};

   &:hover {
      ${DeleteButton} {
         display: flex;
      }
   }
`

const TodoText = styled.span<{ $isChecked: boolean }>`
   flex-grow: 1;
   margin-right: 8px;

   text-decoration: ${props => (props.$isChecked ? `line-through` : 'none')};
`
