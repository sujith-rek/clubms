import { useState } from "react";
import { useRouter } from "next/router";
import { clubRegister } from "@/operations/club.fetch";
import { FormControl, Button, FormLabel, Heading, Input } from "@chakra-ui/react";

export default function ClubRegister() {
    const [user, setUser] = useState({ name: "", email: "", desc: "" });
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {

        const newUser = {
            name: user.name,
            email: user.email,
            password: password,
            desc: user.desc,
        };

        await clubRegister(newUser).then((res) => {
            if (res.status === 200) {
                alert("Clubbedlogged in successfully")
                router.push("/clubs/clubHomePage");
            } else {
                alert(res.error)
            }
        });
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    return (
        <>
            <div style={{ "padding": "3rem" }}>
                <Heading>Signup as a Club</Heading>
                <br />
                <div>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={user.name}
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
                            value={user.email}
                            onChange={handleChange}
                        />
                    </FormControl>
                </div>
                <div style={{ "marginTop": "1rem" }}>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input
                            id="desc"
                            name="desc"
                            type="text"
                            autoComplete="desc"
                            required
                            value={user.desc}
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
                            autoComplete="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                </div>
                <Button marginTop={"1rem"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => handleSubmit()}>SignUp</Button>
                <p style={{"marginTop" : "0.5rem"}}>Have an accout? <span style={{ "cursor": "pointer" }} onClick={() => { router.push('/auth/club/clubLogin') }}>Login as a Club</span></p>
            </div>
        </>
    );
}