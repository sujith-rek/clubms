import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { clubLogin } from "@/operations/club.fetch";

export default function ClubLogin() {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            email: credentials.email,
            password: credentials.password,
        };

        await clubLogin(loginData).then((res) => {
            console.log(res.club)
            if (res.club) {
                localStorage.setItem('user', JSON.stringify(res.club));
                setUser(res.club);
                setIsLoggedIn(true);
            } else {
                setErrorMessage(res.error);
                alert(res.error)
            }
        });

    }

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
            setIsLoggedIn(true);
        } else {
            router.push('/auth/clubLogin');
        }
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    }

    return (
        <div>
            <h2>Login to Your Club</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={credentials.email} onChange={handleChange} required style={{ color: 'black' }} />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required style={{ color: 'black' }} />
                </label>
                <button type="submit">Login</button>
            </form>
            {isLoggedIn && <p>You are logged in!</p>}
        </div>
    );
}
