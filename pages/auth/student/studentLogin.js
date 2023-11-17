import { useState } from "react";
import { useRouter } from "next/router";
import { loginStudent } from "@/operations/student.fetch";
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
} from '@chakra-ui/react'
import { Button, Heading } from '@chakra-ui/react'

export default function StudentLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        console.log(email, password)
        if (email === '' || password === '') {
            console.log(email, password)
            alert('Please fill in all the fields')
            return;
        }
        else {
            const data = {
                "email": email,
                "password": password
            }

            const response = await loginStudent(data);
            if (response.status === 200) {
                alert('Student logged in successfully')
                router.push('/student/studentHomePage')
            } else {
                alert(response.message);
                return;
            }
        }
    }

    return (
        <div style={{"padding" : "3rem"}}>
            <Heading className="RegisterMainSection__header">
                Login as Student
            </Heading>
            <div className="RegisterMainSection__form">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div style={{"marginTop" : "1rem"}}>
                        <FormControl>
                            <FormLabel>Email Id</FormLabel>
                            <Input onChange={(e) => setEmail(e.target.value)} type='email' />
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </FormControl>
                    </div>

                    <div style={{"marginTop" : "1rem"}}>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input onChange={(e) => setPassword(e.target.value)} type='password' />
                        </FormControl>
                    </div>
                    <div style={{"marginTop" : "1rem"}}>
                        <Button onClick={() => handleSubmit()} colorScheme='blue'>Login Student</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
