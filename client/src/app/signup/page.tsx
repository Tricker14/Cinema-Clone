'use client';
import {
    Box, Stack, Paper, Typography, TextField,
    Button, Link
} from "@mui/material";
import { lightBlue, grey } from "@mui/material/colors";
import { useTheme } from "@emotion/react";
import React, { FormEvent, useState } from "react";

interface Errors {
    fullName?: string;
    username?: string;
    email?: string;
    password?: string;
    rtPassword?: string;
}


export default function Signup() {
    const theme = useTheme();
    const [fullName, setFullName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rtPassword, setRtPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: Errors = {};
        if (fullName.trim() === '') {
            errors.fullName = '(*) Please enter your full name';
        } else if (fullName.trim().length < 8) {
            errors.fullName = '(*) Full name must have at least 8 characters';
        } else if (!/^[A-Z]/.test(fullName)) {
            errors.fullName = '(*) First character must be capital';
        }
        if (username.trim() === '') {
            errors.username = '(*) Please enter your username';
        }
        if (email.trim() === '') {
            errors.email = '(*) Please enter your email';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            errors.email = '(*) Invalid email address';
        }
        if (password.trim() === '') {
            errors.password = '(*) Please enter your password';
        }
        if (rtPassword.trim() === '') {
            errors.rtPassword = '(*) Please retype your password';
        } else if (password.trim() !== rtPassword.trim()) {
            errors.rtPassword = '(*) Retype password does not match';
        }

        setErrors(errors);
    }

    return (
        <Box sx={{
            paddingTop: '50px',
            paddingBottom: '50px',
            margin: '0px',
            boxSizing: 'border-box',
            width: '100%',
            // height: '90vh',
            background: 'linear-gradient(135deg, #1488CC, #2B32B2)'
        }}>
            <Paper
                elevation={6}
                sx={{
                    width: '800px',
                    padding: '',
                    margin: '0 auto',
                    bgcolor: grey[100],
                    borderRadius: '20px',
                }}>
                <Stack direction={"row"}>
                    {/* <img id="grab_signup_image" src="signup_image.jpg" alt="" /> */}
                    <Stack
                        padding={3}
                        flexGrow={1}
                        direction={'column'}
                        alignItems={"center"}
                        spacing={3}>
                        <Typography
                            variant='h4'
                            sx={{
                                fontWeight: 'bold',
                                width: '70%',
                                textAlign: "left",
                                color: "#31363F"
                            }}>
                            Sign Up
                        </Typography>
                        <Stack direction={"column"} spacing={1} sx={{ width: '70%' }}>
                            <TextField
                                id="outlined-basic"
                                label="Full-name"
                                variant="standard"
                                color="primary"
                                size="small"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                error={!!errors.fullName}
                                helperText={errors.fullName} />
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                variant="standard"
                                color="primary"
                                size="small"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                error={!!errors.username}
                                helperText={errors.username} />
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="standard"
                                color="primary"
                                size="small"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email} />
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="standard"
                                type="password"
                                autoComplete="current-password"
                                size="small"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password} />
                            <TextField
                                id="outlined-basic"
                                label="Retype password"
                                variant="standard"
                                type="password"
                                autoComplete="current-password"
                                size="small"
                                value={rtPassword}
                                onChange={e => setRtPassword(e.target.value)}
                                error={!!errors.rtPassword}
                                helperText={errors.rtPassword} />


                        </Stack>
                        <Stack direction={'column'} width={'70%'}>
                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    height: '50px',
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    fontSize: '20px',
                                }}
                                disableElevation
                                onClick={handleSubmit}>
                                Sign up
                            </Button>
                            <Typography variant="h6" marginTop={2}>
                                Already have an account ?
                                <Link href="/login" underline="hover">
                                    {'     Log in !'}
                                </Link>
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>


        </Box>
    )
}
