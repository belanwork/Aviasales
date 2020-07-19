import React, { createContext, useReducer } from 'react'

const initialState = {
    headerFilter: {
        price: true,
        speed: false
    },
    asideFilter: {
        transferAll: true,
        transferWO: false,
        transfer1: false,
        transfer2: false,
        transfer3: false
    },
    responseState: null,
    responseStatus: null,
}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_HEADER_FILTER': {
                const { price, speed } = state.headerFilter
                return { ...state, 
                    headerFilter: {
                        price: !price,
                        speed : !speed
                    } 
                }
            }
            case 'SET_ASIDE_FILTER': {
                const { filterValue, value } = action
                return { ...state, asideFilter : {
                    ...state.asideFilter, [filterValue] : value
                }}
            }
            case 'SET_RESPONSE': {
                const { response, status } = action.value
                return { ...state, responseState : response, responseStatus: status}
            }
            default:
                throw new Error()
        }
    }, initialState)

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }