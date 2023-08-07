import { useState } from 'react';
import { Heading, Button, Input as ChakraInput, Link } from "@chakra-ui/react";
import axios from 'axios';
import { admin_login_url, admin_signup_url } from '@public/commonData/Api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Create an object with the user's data
            const userData = {
                email: email,
                password: password,
            };

            // Make the API request
            const response = await axios.post(admin_login_url, userData);

            // Handle the response as needed
            console.log('API Response:', response.data);
        } catch (error) {
            // Handle error
            console.error('API Error:', error);
        }
    };

    return (
        <>
            <Heading mb={6} textAlign={"center"}>Log in</Heading>
            <ChakraInput
                placeholder={"email"}
                mb={3}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <ChakraInput
                placeholder={"password"}
                mb={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button mt={4} colorScheme={"blue"} onClick={handleLogin}>Log In</Button>
            <Link href={admin_signup_url} mt={2} color={"blue.500"}>Don't have an account? Sign Up</Link>
        </>
    )
}
