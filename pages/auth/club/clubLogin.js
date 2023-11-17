import { clubLogin } from "@/operations/club.fetch";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ClubLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        if (email === '' || password === '') {
            alert('Please fill in all the fields');
            return;
        }
        const data = {
            "email": email,
            "password": password
        }
        try {
            const response = await clubLogin(data);
            if (response.status === 200) {
                alert('Club Logged in sucessfully');
                router.push('/clubs/clubHomePage');
            } else {
                alert(response.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div style={{ "padding": "3rem" }}>
            <Heading>Login with your Club credentials</Heading>
            <br />
            <div >
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)} type='email' />
                </FormControl>
            </div>
            <br />
            <div>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input onChange={(e) => setPassword(e.target.value)} type='password' />
                </FormControl>
            </div>
            <br />
            <Button marginBottom={"10px"} colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => handleLogin()}>Login</Button>
            <p>Don't have an accout? <span style={{"cursor" : "pointer"}} onClick={() => {router.push('/auth/club/clubRegister')}}>Signup as a Club</span></p>
        </div>
    )
}