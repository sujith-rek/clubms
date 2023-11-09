import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { clubLogin } from "@/operations/club.fetch";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function ClubLogin() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        if (email === '' || password === '') {
            alert('Please fill in all the fields')
            return;
        }
        else {
            const data = {
                "email": email,
                "password" : password
            }
            const response = await clubLogin(data);
            if (response.status === 200) {
                alert('Club logged in successfully')
                router.push('/clubs/clubHomePage')
            } else {
                alert(response.message);
                return;
            }
        }
    }

    return (
        <div>
            <h2 className="RegisterMainSection__header">
                Login Your Club
            </h2>
            <div className="RegisterMainSection__form">
                <form className="space-y-6">
                    <div>
                        <FormControl>
                            <FormLabel>Club Email</FormLabel>
                            <Input onChange={(e) => setEmail(e.target.value)} type='email' />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>
                    </div>

                    <div>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input onChange={(e) => setPassword(e.target.value)} type='password' />
                        </FormControl>
                    </div>
                    <div>
                        <Button onClick={handleSubmit} colorScheme='blue'>Login Club</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
