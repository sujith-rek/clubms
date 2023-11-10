export async function loginAdmin(data) {
    return await fetch(
        "/api/admin/adminLogin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }
    ).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    });
}

export async function registerAdmin(data) {
    return await fetch(
        "/api/admin/adminRegister",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}

export async function approveRoom(data) {
    return await fetch(
        "/api/roomBook/approveRoom",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}

export async function rejectRoom(data) {
    return await fetch(
        "/api/roomBook/rejectRoom",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}



