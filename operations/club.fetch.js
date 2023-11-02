export async function createEvent(data){
    return await fetch(
        "/api/event/createEvent",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }
    ).then((res) => {
        return res.json()
    }
    ).catch((err) => {
        console.log(err)
    });
}

export async function updateEvent(data){
    return await fetch(
        "/api/event/updateEvent",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }
    ).then((res) => {
        return res.json()
    }
    ).catch((err) => {
        console.log(err)
    });
}

export async function deleteEvent(data){
    return await fetch(
        "/api/event/deleteEvent",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }
    ).then((res) => {
        return res.json()
    }
    ).catch((err) => {
        console.log(err)
    });
}

export async function roomBook(data){
    return await fetch(
        "/api/roomBook/roomRequestCreate",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }
    ).then((res) => {
        return res.json()
    }
    ).catch((err) => {
        console.log(err)
    });
}

export async function fetchEvent(data){
    return await fetch(
        "/api/event/fetchEvent",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }
    ).then((res) => {
        return res.json()
    }
    ).catch((err) => {
        console.log(err)
    });
}


export async function clubLogin(data){
    return await fetch(
        "/api/clubs/clubLogin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }
    ).then((res) => {
        return res.json()
    }
    ).catch((err) => {
        console.log(err)
    });
}


export async function clubRegister(data){
    return await fetch(
        "/api/clubs/clubRegister",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"
        }
    ).then((res) => {
        return res.json()
    }
    ).catch((err) => {
        console.log(err)
    });
}
