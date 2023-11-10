import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginAdmin } from "@/operations/admin.fetch";

export default function AdminLogin() {

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(credentials.email === '' || credentials.password === '') {
            alert('Please fill in all the fields');
            return;
        }
        const loginData = {
            email: credentials.email,
            password: credentials.password,
        };

        await loginAdmin(loginData).then((res) => {
            if (res.admin) {
                localStorage.setItem('admin', JSON.stringify(res.admin));
                setAdmin(res.admin);
                setIsLoggedIn(true);
                router.push("/admin/adminHomePage");
            } else {
                setErrorMessage(res.error);
                alert(res.error)
            }
        });

    }

    useEffect(() => {
        const adminData = localStorage.getItem('admin');
        if (adminData) {
            setAdmin(JSON.parse(adminData));
            setIsLoggedIn(true);
        } else {
            router.push('/auth/admin/adminLogin');
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
            <h2>Login as Admin</h2>
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