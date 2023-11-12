import { ccRegister } from "@/operations/cc.fetch";
import { FormControl, Heading, Input, FormLabel, Button } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useState } from "react"
export default function ccRegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();
    const handleSignUp = async () => {
        if(email === '' || password === '' || name === '') {
            alert('Please fill in all the fields');
            return;
        }
        const data = {
            "name" : name,
            "email" : email,
            "password" : password
        }
        const response = await ccRegister(data);
        if(response.status === 200) {
            alert('CC Member registered succssfully');
            router.push('/cc/ccHomepage');
        } else {
            alert('INTERNAL SERVER ERROR');
        }
    }
    return (
        <div style={{ "padding": "3rem" }}>
            <Heading>Signup as a CC Member</Heading>
            <br />
            <div >
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input onChange={(e) => setName(e.target.value)} type='email' />
                </FormControl>
            </div>
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
            <Button colorScheme='yellow' marginRight={"10px"} color={"black"} onClick={() => handleSignUp()}>SignUp</Button>
            <p>Have an accout? <span style={{"cursor" : "pointer"}} onClick={() => {router.push('/auth/cc/ccLogin')}}>Login as a CC Member</span></p>
        </div>
    )
}