import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { Col, Container, Row } from "react-bootstrap";
import TodoCard from "../assets/components/TodoCard";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
    const { todos } = useContext(TodoContext);
    const { token } = useContext(UserContext)

    return (
        <Container>
            <h1 className="my-3">Your todos</h1>
            <Row>
                <CardGroup todos={todos} token={token} />
            </Row>
        </Container>
    )
}

function CardGroup({ todos, token }) {
    return todos.map((todo) => {
        if (todo.userId === token)
            return (
                <Col md={4} key={todo.id}>
                    <TodoCard todo={todo} />
                </Col>
            )
    })
}