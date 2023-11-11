export async function logout() {
    return await fetch(
        "/api/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    });
}