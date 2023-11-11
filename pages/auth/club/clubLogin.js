import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { clubLogin } from "@/operations/club.fetch";

export default function ClubLogin() {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            email: credentials.email,
            password: credentials.password,
        };

        await clubLogin(loginData).then((res) => {
            if (res.error) {
                alert(res.error);
            } else {
                alert("Login Successful");
                router.push("/clubs/clubHomePage");
            }
        });

    }


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
        </div>
    );
}
