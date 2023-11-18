import { useState } from "react";
import { useRouter } from "next/router";
import { registerAdmin } from "@/operations/admin.fetch";
import { FormControl, Button, FormLabel, Heading, Input } from "@chakra-ui/react";

export default function AdminRegister() {
    const [admin, setAdmin] = useState({ name: "", email: "" });
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {

        if (admin.name === '' || admin.email === '' || password === '') {
            alert('Please fill in all the fields');
            return;
        }
        e.preventDefault();

        const newAdmin = {
            name: admin.name,
            email: admin.email,
            password: password,
        };

        await registerAdmin(newAdmin).then((res) => {
            if (res.status === 200) {
                alert("Admin Created successfully")
                router.push("/admin/adminHomePage");
            } else {
                alert(res.message)
            }
        });
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setAdmin((prevAdmin) => ({
            ...prevAdmin,
            [name]: value,
        }));
    }

    return (
        <>
            <div style={{ "padding": "3rem" }} className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <Heading>SignUp as an Admin</Heading>
                <br />
                <div>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            id="name"
                            name="name"
                            type="name"
                            autoComplete="name"
                            required
                            value={admin.name}
                            onChange={handleChange}
                        />
                    </FormControl>
                </div>
                <div style={{ "marginTop": "1rem" }}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={admin.email}
                            onChange={handleChange}
                        />
                    </FormControl>
                </div>
                <div style={{ "marginTop": "1rem" }}>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                </div>
                <Button onClick={(e) => handleSubmit(e)} marginTop={"1rem"} colorScheme="yellow">Register</Button>
                <p style={{"marginTop" : "0.5rem"}}>Have an accout? <span style={{ "cursor": "pointer" }} onClick={() => { router.push('/auth/admin/adminLogin') }}>Login as an Admin</span></p>
            </div>
        </>
    );
}