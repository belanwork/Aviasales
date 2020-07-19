import React from 'react'
import s from './Loading.module.css'

export const Loading = props => {
    return (
        <div className={s.componentContainer}>
            {`Getting info from API...`}
        </div>
    )
}