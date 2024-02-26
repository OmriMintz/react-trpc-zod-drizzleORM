import { type FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import GlobalStyles from '../src/styles/global'
import { TodoList } from './components/TodoList'
import { darkTheme } from './styles/theme'

const theme = darkTheme

const App: FC = () => {
   return (
      <ThemeProvider theme={theme}>
         <Header>📓 Todo List</Header>
         <TodoList />
         <GlobalStyles />
      </ThemeProvider>
   )
}

export const AppContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding-top: 40px;
`

export const Header = styled.h1`
   text-align: center;
   font-size: 48px;
   padding: 50px 0 50px 0;
`

export const Footer = styled.h6`
   text-align: center;
   font-size: 14px;
   font-weight: 200;
   font-style: italic;
   opacity: 0.5;
   padding-top: 25px;
   padding-bottom: 25px;
`

export default App
