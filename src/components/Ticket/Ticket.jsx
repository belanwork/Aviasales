import React from 'react'
import s from './Ticket.module.css'

export const Ticket = props => {
    const { price, segments, carrier } = props.value
    const [forward, backward] = segments
    const { origin, destination } = forward
    const getPrice = price => {
        return price.toString().replace(/(\d)(?=(\d\d\d)+$)/, '$1 ')
    }
    const getTransferDescription = array => {
        if (!array.length) return 'без пересадок'
        return array.length === 1 ? '1 пересадка' : `${array.length} пересадки`
    }
    const getTransferValue = array => {
        return array.length ? array.join(', ') : '-'
    }
    const getRouteTime = (duration, date) => {
        const firstDate = new Date(date)
        const secondDate = new Date(Date.parse(firstDate) + duration * 60 * 1000)
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        }
        return `${firstDate.toLocaleString("ru", options)} - ${secondDate.toLocaleString("ru", options)}`
    }
    const getLengthTime = duration => {
        const hoursRest = duration / 60 ^ 0
        const minutesRest = duration % 60
        const hours = hoursRest < 10 ? `0${hoursRest}` : hoursRest
        const minutes = minutesRest < 10 ? `0${minutesRest}` : minutesRest
        return `${hours}ч ${minutes}м`
    }
    console.log(props)
    return (
        <section className={s.componentContainer}>
            <div className={s.wrapper}>
                <header className={s.header}>
                    <p className={s.price}>{`${getPrice(price)} Р`}</p>
                    <img className={s.carrier} src={`http://pics.avs.io/99/36/${carrier}.png`} alt="" />
                </header>
                <div className={s.ticketInfo}>
                    <div className={s.forward}>
                        <div className={s.description}>
                            <p>{`${origin} - ${destination}`}</p>
                            <p>В пути</p>
                            <p>{getTransferDescription(forward.stops)}</p>
                        </div>
                        <div className={s.ticketValues}>
                            <p>{getRouteTime(forward.duration, forward.date)}</p>
                            <p>{getLengthTime(forward.duration)}</p>
                            <p>{getTransferValue(forward.stops)}</p>
                        </div>
                    </div>
                    <div className={s.backward}>
                        <div className={s.description}>
                            <p>{`${origin} - ${destination}`}</p>
                            <p>В пути</p>
                            <p>{getTransferDescription(backward.stops)}</p>
                        </div>
                        <div className={s.ticketValues}>
                            <p>{getRouteTime(backward.duration, backward.date)}</p>
                            <p>{getLengthTime(backward.duration)}</p>
                            <p>{getTransferValue(backward.stops)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}