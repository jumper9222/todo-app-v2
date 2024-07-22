import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";

export default function AddTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const { todos, setTodos } = useContext(TodoContext);
    const { token } = useContext(UserContext)
    const navigate = useNavigate();

    function addTodo(event) {
        event.preventDefault();
        setTodos([...todos, { id: Date.now(), userId: token, title, description, completed }]);
        navigate("/");
    }

    return (
        <Container>
            <h1 className="my-3">Add Todo</h1>
            <Form onSubmit={addTodo}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Get software developer job"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="textarea"
                        rows={3}
                        placeholder={`1. Create amazing project\n2. Apply to Google & Netflix\n3. Crush interview`}
                        required
                    />
                </Form.Group>
                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Mark as completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="mb-3"
                />
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}