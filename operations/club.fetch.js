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

