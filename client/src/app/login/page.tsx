'use client';
import { Box, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material'
import { grey, lightBlue } from '@mui/material/colors'
import React, { useState } from 'react'

interface Errors {
    username?: string;
    password?: string;
}

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors: Errors = {};
        if (username.trim() === '') {
            errors.username = '(*) Please enter your username';
        }
        if (password.trim() === '') {
            errors.password = '(*) Please enter your password';
        }
        setErrors(errors);
    }
    return (
        <Box sx={{
            paddingTop: '100px',
            paddingBottom: '100px',
            margin: '0px',
            boxSizing: 'border-box',
            width: '100%',
            // height: '90vh',
            background: 'linear-gradient(135deg, #1488CC, #2B32B2)'

        }}>
            <Paper
                elevation={6}
                sx={{
                    width: '700px',
                    padding: '',
                    margin: '0 auto',
                    bgcolor: grey[100],
                    borderRadius: '20px',
                }}>
                <Stack direction={"row"}>
                    {/* <img id="grab_login_image" src="login_image.jpg" alt="" /> */}
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
                            Log In
                        </Typography>
                        <Stack direction={"column"} spacing={2} sx={{ width: '70%' }}>
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                color="primary"
                                size="small"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                error={!!errors.username}
                                helperText={errors.username} />
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                type="password"
                                autoComplete="current-password"
                                size="small"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password} />

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
                                onClick={handleSubmit} >
                                Log in
                            </Button>
                            <Typography variant="h6" marginTop={2}>
                                Does not have an account ?
                                <Link href="/signup" underline="hover">
                                    {'     Sign up !'}
                                </Link>
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>


        </Box>
    )
}
