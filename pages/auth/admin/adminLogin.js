import { useState } from "react";
import { loginAdmin } from "@/operations/admin.fetch";
import { useRouter } from "next/router";

export default function AdminLogin() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.email === '' || credentials.password === '') {
            alert('Please fill in all the fields');
            return;
        }
        const loginData = {
            email: credentials.email,
            password: credentials.password,
        };

        await loginAdmin(loginData).then((res) => {
            if (res.error) {
                alert(res.error);
            } else {
                alert("Login Successful");
                router.push("/admin/adminHomePage");
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
            <h2>Login as Admin</h2>
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