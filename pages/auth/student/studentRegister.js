import { useState } from "react";
import { useRouter } from "next/router";
import { registerStudent } from "@/operations/student.fetch";
import { Button, Heading } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
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
            const response = await registerStudent(data);
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
            <div style={{ "padding": "3rem" }} className="RegisterMainSection">
                <Heading className="RegisterMainSection__header">
                    Register as a Student
                </Heading>
                <div className="RegisterMainSection__form">
                    <form className="space-y-6">
                        <div style={{ "marginTop": "1rem" }}>
                            <FormControl>
                                <FormLabel>Your Name</FormLabel>
                                <Input onChange={(e) => setName(e.target.value)} type='text' />
                            </FormControl>
                        </div>
                        <div style={{ "marginTop": "1rem" }}>
                            <FormControl>
                                <FormLabel>Your Email</FormLabel>
                                <Input onChange={(e) => setEmail(e.target.value)} type='email' />
                            </FormControl>
                        </div>

                        <div style={{ "marginTop": "1rem" }}>
                            <FormControl>
                                <FormLabel>Roll No</FormLabel>
                                <Input onChange={(e) => setRollno(e.target.value)} type='number' />
                            </FormControl>
                        </div>

                        <div style={{ "marginTop": "1rem" }}>
                            <FormControl>
                                <FormLabel>Set Password</FormLabel>
                                <Input onChange={(e) => setPassword(e.target.value)} type='password' />
                            </FormControl>
                        </div>


                        <div style={{ "marginTop": "1rem" }}>
                            <Button onClick={handleSubmit} colorScheme='blue'>Register</Button>
                        </div>
                        <p>Have an accout? <span style={{ "cursor": "pointer" }} onClick={() => { router.push('/auth/student/studentRegister') }}>Signup as a Student</span></p>

                    </form>
                </div>
            </div>
        </>
    );
}