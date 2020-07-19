export async function getFromApi(action) {
    const URL = `https://front-test.beta.aviasales.ru`

    switch (action.type) {
        case 'GET_BANCH_OF_TICKETS':
            {
                const response = await fetch(`${URL}/search`)
                    .then(IDRes => IDRes.ok ? IDRes.json() : Promise.reject(IDRes))
                    .then(ID_JSON => {
                        const { searchId } = ID_JSON
                        return fetch(`${URL}/tickets?searchId=${searchId}`)
                    })
                    .then(async ticketsRes => {
                        if (!ticketsRes.ok) return Promise.reject(ticketsRes)
                        const { status } = ticketsRes
                        const JSON = await ticketsRes.json()
                        return { ticketsRes: JSON, status }
                    })
                    .then(ticketsObj => {
                        const { ticketsRes: { tickets }, status } = ticketsObj
                        const modifyJSON = tickets.map(ticket => {
                            const [forward, backward] = ticket.segments
                            const { duration: fwDur, stops: fwStops } = forward
                            const { duration: bwDur, stops: bwStops } = backward
                            const totalDuration = fwDur + bwDur
                            const maxStops = Math.max(fwStops.length, bwStops.length)
                            return {...ticket, totalDuration, maxStops }
                        })
                        return { response: modifyJSON, status }
                    })
                    .catch(error => ({ response: null, status: error.status }))
                return response
            }
        default:
            console.log('WRONG API_ACTION')
    }
}