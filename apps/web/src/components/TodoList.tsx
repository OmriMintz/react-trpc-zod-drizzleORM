import { Container } from '@mui/material'
import * as React from 'react'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import type { ITodo } from '../../../server/src/type'
import { useTodos } from '../hooks/useTodos'
import { Filter, absurd } from '../types/todo'
import { TodoItem } from './TodoItem'

export const TodoList: FC = () => {
   const inputRef = useRef<HTMLInputElement>(null)
   const [value, setValue] = useState('')
   const [filter, setFilter] = useState<Filter>(Filter.all)

   const { todos, addTodo, toggleTodo, removeTodo } = useTodos()

   const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
      setValue(event.target.value)
   }

   const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
      if (event.key === 'Enter' && value.trim() !== '') {
         addTodo(value)
         setValue('')
      }
   }

   const handleChangeFilter = (filter: Filter) => {
      setFilter(filter)
   }

   const filteredTodos = useMemo(
      () =>
         todos.filter(todo => {
            switch (filter) {
               case Filter.completed:
                  return todo.isCompleted
               case Filter.all:
                  return true
               default:
                  return absurd(filter)
            }
         }),
      [todos, filter]
   )

   const filterButtons = Object.values(Filter).map(f => (
      <FilterButton key={f} onClick={() => handleChangeFilter(f)} $isActive={f === filter}>
         {f}
      </FilterButton>
   ))

   useEffect(() => {
      inputRef.current?.focus()
   }, [])

   return (
      <TodoListContainer sx={{ display: 'flex' }} maxWidth="sm" data-testid="todo-list">
         <Input
            placeholder="Write your todos here..."
            value={value}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            ref={inputRef}
         />

         {filteredTodos &&
            filteredTodos.map((todo: ITodo) => (
               <TodoItem
                  toggleTodo={toggleTodo}
                  removeTodo={removeTodo}
                  key={todo.id}
                  id={todo.id}
                  name={todo.name}
                  isCompleted={todo.isCompleted}
                  isExpired={todo.isExpired}
               />
            ))}

         <TodoFooter>
            <FilterButtons>{filterButtons}</FilterButtons>
         </TodoFooter>
      </TodoListContainer>
   )
}

const TodoListContainer = styled(Container)`
   margin: 0 auto;
   padding: 20px;
   border-radius: 4px;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
   background-color: ${props => props.theme.colors.secondary};
   min-height: 432px;
   display: flex;
   flex-direction: column;
   height: 100%;
`

const Input = styled.input`
   width: 100%;
   padding: 10px;
   border: none;
   margin-bottom: 10px;
   height: 48px;
   border-bottom: 1px solid ${props => props.theme.colors.primary};
   background-color: ${props => props.theme.colors.secondary};
`

const FilterButton = styled.button<{ $isActive: boolean }>`
   background-color: transparent;
   border: none;
   padding: 10px 15px;
   cursor: pointer;
   margin-right: 10px;
   font-size: 12px;

   border: ${props => (props.$isActive ? `1px solid ${props.theme.colors.primary}` : 'none')};
   border-radius: 10px;

   &:last-child {
      margin-right: 0;
   }
`

const FilterButtons = styled.div`
   display: flex;
   padding-left: 200px;
   padding-up: 35px;
`

const TodoFooter = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;

   justify-self: end;
   margin-top: auto;
`
