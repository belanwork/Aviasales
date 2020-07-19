import React from 'react'
import s from './HeaderFilter.module.css'
import { store } from '../../store/store';
import { useContext } from 'react';


export const HeaderFilter = props => {
    const { state, dispatch } = useContext(store)
    const { price, speed } = state.headerFilter
    const setActive = () => {
        return dispatch({ type: 'SET_HEADER_FILTER' })
    }
    return (
        <div className={s.componentContainer}>
            <button
                className={`${s.btn} ${price ? s.btnActive : s.btnNonActive}`}
                disabled={price}
                onClick={setActive}>Самый дешевый</button>
            <button
                className={`${s.btn} ${speed ? s.btnActive : s.btnNonActive}`}
                disabled={speed}
                onClick={setActive}>Самый быстрый</button>
        </div>
    )
}