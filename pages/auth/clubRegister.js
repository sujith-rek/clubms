import { useState } from "react";
import { useRouter } from "next/router";
import { clubRegister } from "@/operations/club.fetch";
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
} from '@chakra-ui/react'
export default function ClubRegister() {
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        if (name === '' || email === '' || password === '' || description === '') {
            alert('Please fill in all the fields');
            return;
        }
        else {
            const data = {
                "name": name,
                "email": email,
                "password": password,
                "description": description,
                "role": "CLUB"
            }
            const response = await clubRegister(data);
            console.log(response);
            if (response.status === 200) {
                alert('Club created successully');
                router.push('/clubs/clubHomePage')
                return;
            } else {
                alert(response.message);
                return;
            }
        }
    };

    return (
        <>
            <div className="RegisterMainSection">
                <h2 className="RegisterMainSection__header">
                    Register Your Club
                </h2>
                <div className="RegisterMainSection__form">
                    <form className="space-y-6">
                        <div>
                            <FormControl>
                                <FormLabel>Club Name</FormLabel>
                                <Input onChange={(e) => setName(e.target.value)} type='text' />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <FormLabel>Club Email</FormLabel>
                                <Input onChange={(e) => setEmail(e.target.value)} type='email' />
                                <FormHelperText>We'll never share your email.</FormHelperText>
                            </FormControl>
                        </div>

                        <div>
                            <FormControl>
                                <FormLabel>Set Password</FormLabel>
                                <Input onChange={(e) => setPassword(e.target.value)} type='password' />
                            </FormControl>
                        </div>

                        <div>
                            <FormControl>
                                <FormLabel>Club Description</FormLabel>
                                <Input onChange={(e) => setDescription(e.target.value)} type='text' />
                                <FormHelperText>A small description about your club.</FormHelperText>
                            </FormControl>
                        </div>
                        <div>
                            <Button onClick={handleSubmit} colorScheme='blue'>Register Club</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}