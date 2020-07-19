export async function cloneAndSort(initialArr, asideFilterValue, headerFilterValue) {

    const cloneArray = async(array) => {
        return JSON.parse(JSON.stringify(array))
    }
    const getAsidePriorityValue = obj => {
        const { transferAll, transferWO, transfer1, transfer2, transfer3 } = asideFilterValue
        return (transferAll && 5) || (transferWO && 1) || (transfer1 && 2) || (transfer2 && 3) || (transfer3 && 4)
    }
    const asidePriorityValue = getAsidePriorityValue(asideFilterValue)
    const filteredArray = await cloneArray(initialArr)
        .then(clonedArray => {
            return clonedArray.filter(ticket => ticket.maxStops < asidePriorityValue)
        })
        .then(filteredArr => {
            if (headerFilterValue) return filteredArr.sort((a, b) => a.price - b.price)
            return filteredArr.sort((a, b) => a.totalDuration - b.totalDuration)
        })

    return filteredArray
}