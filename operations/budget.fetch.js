export async function postBudgetRequest(data) {
    return await fetch('/api/budget/createRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}


export async function updateBudgetRequest(data) {
    return await fetch('/api/budget/editRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}

