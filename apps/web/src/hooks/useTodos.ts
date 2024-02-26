import { useEffect, useState } from 'react'

import { trpc } from 'trpc'

import type { ITodo } from '../../../server/src/type'

export function useTodos() {
   const [todos, setTodos] = useState<ITodo[]>([])

   const { data: Items } = trpc.getItems.useQuery()
   const { mutateAsync: addItem } = trpc.addItem.useMutation()
   const { mutateAsync: updateStatus } = trpc.updateItem.useMutation()
   const { mutateAsync: removeItem } = trpc.removeItem.useMutation()

   useEffect(() => {
      setTodos(Items ?? [])
   }, [Items])

   const addTodo = async (name: string): Promise<void> => {
      const newItem = await addItem({ name })
      setTodos(prevState => [...prevState, newItem])
   }

   const toggleTodo = async (id: number): Promise<void> => {
      const item = todos.find(todo => todo.id === id)

      if (!item) {
         console.log("Can't find the item")
         return
      }

      const isSuccess = await updateStatus({
         id: id,
         isCompleted: !item.isCompleted,
      })

      if (!isSuccess) {
         console.log('got an error skip change')
         return
      }

      setTodos(prevState =>
         prevState.map(todo => {
            if (todo.id === id) {
               return { ...item, isCompleted: !item.isCompleted }
            }
            return todo
         })
      )
   }

   const removeTodo = async (id: number): Promise<void> => {
      const item = todos.find(todo => todo.id === id)

      if (!item) {
         console.log("Didn't find the item for remove")
         return
      }

      await removeItem({ id })

      setTodos(prevState => {
         return prevState.filter(todo => todo.id !== id)
      })
   }

   return {
      todos,
      addTodo,
      toggleTodo,
      removeTodo,
   }
}
