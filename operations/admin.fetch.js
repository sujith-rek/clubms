export async function loginAdmin(data) {
    return await fetch(
        "/api/admin/adminLogin", {
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
    });
}

export async function registerAdmin(data) {
    return await fetch(
        "/api/admin/adminRegister", {
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
        "/api/roomBook/approveRoom", {
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
        "/api/roomBook/rejectRoom", {
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

export async function addRoom(data) {
    return await fetch(
        "/api/roomBook/addRoom", {
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

export async function removeRoom(data) {
    return await fetch(
        "/api/roomBook/removeRoom", {
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

export async function approveEvent(eventId) {
    const token = localStorage.getItem('admin'); // assuming the token is stored under 'admin' key

    return await fetch(
        "/api/event/approveEvent",{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ eventId }),
            credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}



