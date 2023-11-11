export async function loginStudent(data) {
    return await fetch(
        "/api/student/studentLogin", {
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

export async function registerStudent(data) {
    return await fetch(
        "/api/student/studentRegister", {
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

export async function fetchAvailableEvents() {
    return await fetch(
        "/api/event/fetchAvailable", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}


