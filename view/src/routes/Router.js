import React, { useContext, createContext, useState } from 'react'
import {
    Route,
    BrowserRouter,
    Routes,
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import { useForm } from "react-hook-form";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';





import Home from '../components/Home';
import IG from '../components/IG';
import Person from '../components/Person';
import AddPost from '../pages/AddPost';
import Appbar from '../pages/Appbar'
import ShowImg from '../pages/ShowImg'
import Setting from '../pages/Setting'
import ShowImgDetail from '../pages/ShowImgDetail'
import ShowImgId from '../pages/ShowImgId'
import api from '../api/api';


// const pages = ['Form', 'ShowImg', 'ShowImgDetail'];
export const UserContext = createContext()
function Main() {
    const [user, setUser] = useState({ loggedIn: true })
    console.log(localStorage.getItem('userIsLogin'));
    console.log(user.loggedIn);
    React.useEffect(() => {
        setUser({ loggedIn: localStorage.getItem('userIsLogin') })
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                {/* <LogInButtons /> */}
                {/* {user.loggedIn === true ? (
                    <>
                        <Appbar />
                    </>
                ) : null} */}
                <Routes>
                    <Route path='/' element={<LogInButtons />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/Home' element={<Home />} />
                        <Route path='/IG' element={<IG />} />
                        <Route path='/Person' element={<Person />} />
                        <Route path='/AddPost' element={<AddPost />} />
                        <Route path='/ShowImg' element={<ShowImg />} />
                        <Route path='/Setting' element={<Setting />} />
                        <Route path='/ShowImgDetail' element={<ShowImgDetail />} />
                        <Route path="/ShowImgDetail/:Id" element={<ShowImgId />} />
                        <Route
                            path="*"
                            element={
                                <main style={{ padding: "1rem" }}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Route>
                </Routes >
            </BrowserRouter>
        </UserContext.Provider>
    )
}

export default Main


const useAuth = () => {
    const { user } = useContext(UserContext)
    return user && user.loggedIn
}
const ProtectedRoutes = () => {
    const location = useLocation()
    const isAuth = useAuth()
    return isAuth ? (
        <Outlet />
    ) : (
        <>
            <Navigate to='/' replace state={{ from: location }} />
        </>
    )
}



const theme = createTheme();

const LogInButtons = () => {
    const { register, handleSubmit } = useForm();
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [show, setShow] = useState(false)
    const onSubmit = (data) => {
        api("Users/login?account=" + data.account + "&password=" + data.password).read()
            .then(function (res) {
                console.log(res);
                if (res.data.userIsLogin === true) {
                    setUser({ loggedIn: true })
                    console.log(user.loggedIn);
                    localStorage.setItem('userIsLogin', true)
                    if (location.state?.from) {
                        navigate(location.state.from)
                    }
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('account', data.account);
                    window.location.href="http://localhost:3000/ShowImgDetail"; 
                    console.log(localStorage.getItem('username'));
                    // console.log(localStorage.getItem('password'));
                } else {
                    setShow(true);
                }
            })
    };

    return (
        <>
            {user.loggedIn === true ?
                (
                    <div>
                        登入成功
                        <Button
                            onClick={() => {
                                // if (!user.loggedIn) return
                                setUser({ loggedIn: false })
                                localStorage.setItem('userIsLogin', false)
                            }}
                        >
                            登出
                        </Button>
                    </div>
                ) : (
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        {...register("account", { required: "必填" })}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        {...register("password", { required: "必填" })}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        登入
                                    </Button>
                                </Box>
                                {!show ?
                                    (null) : (
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="error">帳號密碼錯誤</Alert>
                                        </Stack>
                                    )
                                }
                            </Box>
                        </Container>
                    </ThemeProvider>
                )}
        </>
    );
}