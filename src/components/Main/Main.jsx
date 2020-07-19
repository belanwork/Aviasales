import React from 'react'
import s from './Main.module.css'
import { HeaderFilter } from '../HeaderFilter/HeaderFilter'
import { AsideFilter } from '../AsideFilter/AsideFilter'
import { ArrayTickets } from '../ArrayTickets/ArrayTickets'
import { useEffect } from 'react'
import { getFromApi } from '../../utilities/getFromAPI'
import { store } from '../../store/store'
import { useContext } from 'react'
import { Loading } from '../Loading/Loading'

export const Main = props => {
    const { state, dispatch } = useContext(store)
    const { responseState, responseStatus } = state
    useEffect(()=> {
        if ( responseStatus !== 200 ) {
            getFromApi({type : 'GET_BANCH_OF_TICKETS'})
            .then(obj => dispatch({ type : 'SET_RESPONSE', value : obj }))
        }
    })
    if (!responseState) return <Loading />
    return (
        <main className={s.componentContainer}>
            <HeaderFilter />
            <AsideFilter />
            <ArrayTickets />
        </main>
    )
}