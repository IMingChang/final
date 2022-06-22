import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Skeleton from '@mui/material/Skeleton';
import MenuItem from '@mui/material/MenuItem';
import api from '../api/api'
import Appbar from './Appbar';

const Input = styled('input')({
    display: 'none',
});
const currencies = [
    {
        value: '男',
        label: '男',
    },
    {
        value: '女',
        label: '女',
    }
];
export default function AddressForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [personData, setPersonData] = useState()
    const onSubmit = data => {
        const fData = new FormData()
        for (const key in data) {
            if (key === 'File') {
                for (var i = 0, len = data[key].length; i < len; i++) {
                    fData.append(key, data[key][i])
                }
            }
            else {
                fData.append(key, data[key])
            }
        }

        fData.append("Account", localStorage.getItem('account'))
        api("Files/User").updata2(fData)
            .then(function () {
                alert("成功");
                window.location.reload();
            })
            .catch(function () {
                alert("失敗");
            });
    }
    useEffect(() => {
        api("Users/").read(localStorage.getItem('userName'))
            .then(function (res) {
                setPersonData(res.data[0])
            })
    }, [])
    const onChangeHandler = e => {
        console.log(e);
        const { name, value } = e.target;
        setPersonData(
            preState =>
            ({
                ...preState,
                [name]: value
            })
        );
        console.log(personData);
    };
    return (
        <>
            <Appbar />
            <Stack
                spacing={1}
                sx={{ width: "500px", margin: "30px auto" }}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Paper
                    sx={{ textAlign: 'center', p: 5 }}
                >
                    {personData === undefined ? (
                        <Skeleton variant="rectangular" width={600} height={300} />
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid item xs={12}>
                                <img
                                    src={"http://localhost:5104/" + personData.url}
                                    loading="lazy"
                                    alt="head"
                                    style={{
                                        borderRadius: "50%",
                                        width: "150px",
                                        height: "150px",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file"
                                        {...register('File')}
                                    />
                                    <IconButton color="secondary" aria-label="upload picture" component="span" size="large">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom>
                                        個人檔案
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="text"
                                        label="姓名"
                                        variant="standard"
                                        value={personData.userName}
                                        onInput={onChangeHandler}
                                        fullWidth
                                        {...register("userName", { required: "請輸入姓名" })}
                                    />
                                    <div style={{ textAlign: "left" }}>
                                        <ErrorMessage
                                            errors={errors}
                                            name="userName"
                                            render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        defaultValue=""
                                        label="性別"
                                        error={errors.currency}
                                        helperText={errors.currency?.message}
                                        variant="standard"
                                        value={personData.gender}
                                        onChange={onChangeHandler}
                                        inputProps={register('gender', {
                                            required: '請選擇性別',
                                        })}
                                    >
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <div style={{ textAlign: "left" }}>
                                        <ErrorMessage
                                            errors={errors}
                                            name="Gender"
                                            render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        label="簡介"
                                        variant="standard"
                                        value={personData.profile}
                                        onInput={onChangeHandler}
                                        fullWidth
                                        {...register("Profile", { required: "請輸入簡介" })}
                                    />
                                    <div style={{ textAlign: "left" }}>
                                        <ErrorMessage
                                            errors={errors}
                                            name="Profile"
                                            render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" size='large'>送出</Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Paper>
            </Stack>
        </>
    );
}