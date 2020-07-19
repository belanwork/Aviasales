import React from 'react'
import s from './ArrayTickets.module.css'
import { store } from '../../store/store';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Loading } from '../Loading/Loading';
import { Ticket } from '../Ticket/Ticket';
import { useState } from 'react';
import { cloneAndSort } from '../../utilities/cloneAndSort';

export const ArrayTickets = props => {
    const { state } = useContext(store)
    const { headerFilter, asideFilter, responseState } = state
    const [ filteredResults, setFilteredResults ] = useState(null)
    useEffect(() => {
        const { price } = headerFilter
        cloneAndSort(responseState, asideFilter, price)
        .then(array => setFilteredResults(array.slice(0,6)))
    },[ headerFilter, asideFilter ])
    if (!filteredResults) return <Loading />
    return (
        <div className={s.componentContainer}>
            {filteredResults.map((ticketValue,i) => <Ticket key={i} value={ticketValue} />)}
        </div>
    )
}