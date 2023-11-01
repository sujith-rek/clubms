import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ClubLogin() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        console.log(credentials)

        fetch('/api/clubs/clubLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })
        .then(response => {
            if (response.ok) {
                setIsLoggedIn(true); // Set isLoggedIn to true when login is successful
            } else {
                throw new Error('Failed to log in');
            }
        })
        .catch(error => {
            console.error(error);
            setErrorMessage('Failed to log in');
        });
    }
    useEffect(() => {
        // Get user data from local storage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Redirect to login page if no user data
            router.push('/clubLogin');
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
            {isLoggedIn && <p>You are logged in!</p>} {/* Display a message when the user is logged in */}
        </div>
    );
}
