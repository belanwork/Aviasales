import React from 'react'
import s from './Header.module.css'

export const Header = props => {
    return (
        <header className={s.componentContainer}>
            <img src="img/Logo.png" alt="" className={s.headerLogo}/>
        </header>
    )
}