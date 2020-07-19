import React from 'react'
import s from './AsideFilter.module.css'
import { useContext } from 'react';
import { store } from '../../store/store';

export const AsideFilter = props => {
    const asideButtons = [
        { id: 'transferAll', spanValue: 'Все' },
        { id: 'transferWO', spanValue: 'Без пересадок' },
        { id: 'transfer1', spanValue: '1 пересадка' },
        { id: 'transfer2', spanValue: '2 пересадки' },
        { id: 'transfer3', spanValue: '3 пересадки' },
    ]
    return (
        <aside className={s.componentContainer}>
            <p className={s.article}>Количество пересадок</p>
            <ul>
                {asideButtons.map((value, i) => {
                    return <ListButton value={value} key={`btn${i}`} />
                })}
            </ul>
        </aside>
    )
}

const ListButton = props => {
    const { state, dispatch } = useContext(store)
    const { id, spanValue } = props.value
    const { [id]: IDBool } = state.asideFilter
    const getCheck = e => {
        return dispatch({
            type: 'SET_ASIDE_FILTER',
            filterValue: e.target.id,
            value: e.target.checked
        })
    }
    return (
        <li>
            <input
                onClick={getCheck}
                className={s.checkBox}
                type="checkbox"
                id={id}
                defaultChecked={IDBool}
            />
            <label className={s.checkBoxLabel} htmlFor={id} >
                <span>{spanValue}</span>
            </label>
        </li>
    )
}