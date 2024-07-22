import { useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { userDatabase, setToken } = useContext(UserContext)
    const navigate = useNavigate()

    const loginHandler = (e) => {
        e.preventDefault
        for (const user of userDatabase) {
            if (username === user.username && password === user.password) {
                setToken(user.id)
                navigate('/')
            }
        }
    }

    return (
        <Container className="my-3">
            <h1 className="my-3">Welcome to your todos app</h1>
            <Form onSubmit={loginHandler}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Label>password</Form.Label>
                <Form.Control
                    className="mb-3"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" className="mb-3">Login</Button>
                <p>Don&apos;t have an account? Click <a href="/signup">here</a> to sign up.</p>
            </Form>
        </Container>
    )
}