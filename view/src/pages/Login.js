import React, { useState } from "react";
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


const theme = createTheme();

export default function SignIn() {
    const { register, handleSubmit } = useForm();
    const [show, setShow] = useState(false)
    const onSubmit = (data) => {
        if (data.userName === "user" && data.password === "123") {
            localStorage.setItem('userName', data.userName);
            localStorage.setItem('password', data.password);
            localStorage.setItem('userIsLogin', 'true');
            console.log(localStorage.getItem('userName'));
            console.log(localStorage.getItem('password'));
            
            // window.location.href="http://localhost:3000/ShowImgDetail";
        } else {
            setShow(true);
        }
    };

    return (
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
                            {...register("userName", { required: "必填" })}
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
                            Sign In
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
    );
}