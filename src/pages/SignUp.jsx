import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(null)
    const [usernameTaken, setUsernameTaken] = useState(null)
    const { userDatabase, setUserDatabase } = useContext(UserContext);
    const navigate = useNavigate()
    const passWordsMatch = password === confirmPassword
    const usernameDoesntExist = userDatabase.every((user) => user.username !== username)


    useEffect(() => {
        if (!passWordsMatch) {
            setPasswordsDontMatch(true)
        }
        if (passWordsMatch) {
            setPasswordsDontMatch(false)
        }
        if (!usernameDoesntExist) {
            setUsernameTaken(true)
        }
        if (usernameDoesntExist) {
            setUsernameTaken(false)
        }
    }, [usernameDoesntExist, passWordsMatch])

    const submitHandler = (e) => {

        e.preventDefault();
        if (passWordsMatch && usernameDoesntExist) {
            setUserDatabase([...userDatabase, { username, password, id: userDatabase.length + 1 }])
            navigate("/login")
        }
    }

    return (
        <Container className="my-3">
            <h1 className="mb-3">Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control

                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        placeholder="Username"
                        required
                    />
                    {usernameTaken && <Form.Text className="text-danger">Username is already taken</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className="mb-3"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="Password"
                        required
                    />
                    <Form.Control
                        className="mb-1"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        placeholder="Confirm Password"
                        required
                    />
                    {passwordsDontMatch && <Form.Text className="text-danger">Passwords do not match</Form.Text>}
                </Form.Group>
                <Button type="submit" className="mt-3">Sign Up</Button>
            </Form>
        </Container>
    )
}