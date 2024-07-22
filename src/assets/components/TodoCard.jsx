import { useContext, useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { TodoContext } from "../../contexts/TodoContext";

export default function TodoCard({ todo }) {
    const completed = todo.completed;
    const border = completed ? "success" : "danger";
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const [showCard, setShowCard] = useState(false)
    const { setTodos } = useContext(TodoContext)

    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
            setTimerInterval(intervalID)
        }
    }

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null)
    }

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setTimer(0);
    }

    const deleteTodo = () => {
        return setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id))
    }

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval])

    const showCardHandler = () => {
        setShowCard(true)
    }

    const hideCardHandler = () => {
        setShowCard(false)
    }

    return (
        <>
            <Card border={border} className="my-3">
                <Card.Header>{!completed && "Not"} Completed</Card.Header>
                <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                    <p>Timer: {timer} seconds</p>
                    <Button onClick={startTimer}>
                        <i className="bi bi-play"></i>
                    </Button>
                    <Button onClick={pauseTimer} className="mx-2">
                        <i className="bi bi-pause-fill"></i>
                    </Button>
                    <Button onClick={resetTimer} className="mx-2">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                    <Button variant="secondary" href={`todo/${todo.id}`} className="ms-2">
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button onClick={showCardHandler} className="mx-2" variant="danger">
                        <i className="bi bi-trash3"></i>
                    </Button>

                    <Modal
                        show={showCard}
                        onHide={hideCardHandler}
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Confirm Delete
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={hideCardHandler}>Cancel</Button>
                            <Button variant="danger" onClick={deleteTodo}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </>
    )
}