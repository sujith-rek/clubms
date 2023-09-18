export async function loginAdmin(data) {
    return await fetch(
        "/api/login",{
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
        "/api/register",{
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




