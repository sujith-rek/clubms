import { useState } from "react";
import { useRouter } from "next/router";
import { registerStudent } from "@/operations/student.fetch";
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
    const [rollno, setRollno] = useState("");

    const handleSubmit = async (e) => {
        if (name === '' || email === '' || password === '' || rollno === '') {
            alert('Please fill in all the fields');
            return;
        }
        else {
            const data = {
                "name": name,
                "email": email,
                "rollNo": rollno,
                "password": password,
            }
            console.log(data);
            const response = await registerStudent(data);
            console.log(response);
            if (response.status === 200) {
                alert('Student account created successully');
                router.push('/student/studentHomePage')
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
                    Register as a Student
                </h2>
                <div className="RegisterMainSection__form">
                    <form className="space-y-6">
                        <div>
                            <FormControl>
                                <FormLabel>Your Name</FormLabel>
                                <Input onChange={(e) => setName(e.target.value)} type='text' />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <FormLabel>Your Email</FormLabel>
                                <Input onChange={(e) => setEmail(e.target.value)} type='email' />
                                <FormHelperText>We'll never share your email.</FormHelperText>
                            </FormControl>
                        </div>

                        <div>
                            <FormControl>
                                <FormLabel>Roll No</FormLabel>
                                <Input onChange={(e) => setRollno(e.target.value)} type='number' />
                            </FormControl>
                        </div>

                        <div>
                            <FormControl>
                                <FormLabel>Set Password</FormLabel>
                                <Input onChange={(e) => setPassword(e.target.value)} type='password' />
                            </FormControl>
                        </div>

                 
                        <div>
                            <Button onClick={handleSubmit} colorScheme='blue'>Register</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}