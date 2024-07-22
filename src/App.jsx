import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import ErrorPage from "./pages/ErrorPage";
import { TodoContext } from "./contexts/TodoContext";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import EditTodo from "./pages/EditTodo";
import { UserContext } from "./contexts/UserContext";
import Login from "./pages/Login";
import RequireAuth from "./assets/components/RequireAuth";
import { useContext } from "react";
import SignUp from "./pages/SignUp";

function Layout() {
  const navigate = useNavigate()
  const { setToken, token } = useContext(UserContext)
  const logout = () => {
    setToken('')
    navigate('/login')
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Todos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/add">Add Todo</Nav.Link>
          </Nav>
          {token && <Button variant='danger' onClick={logout}>Logout</Button>}
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [userDatabase, setUserDatabase] = useLocalStorage('userDatabase', [])
  const [token, setToken] = useLocalStorage('token', null)

  return (
    <UserContext.Provider value={{ userDatabase, setUserDatabase, token, setToken }}>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route index element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              } />
              <Route path="add" element={
                <RequireAuth>
                  <AddTodo />
                </RequireAuth>
              } />
              <Route path="*" element={<ErrorPage />} />
              <Route path="todo/:id" element={
                <RequireAuth>
                  <EditTodo />
                </RequireAuth>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </TodoContext.Provider>
    </UserContext.Provider>
  )
}