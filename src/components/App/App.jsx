import React from 'react'
import s from './App.module.css'
import { StateProvider } from '../../store/store'
import { Header } from '../Header/Header'
import { Main } from '../Main/Main'

export const App = props => {
  return (
    <div className={s.componentContainer}>
      <StateProvider>
        <Header />
        <Main />
      </StateProvider>
    </div>
  )
}

