import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from '../api/api'
import { TextField, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { ErrorMessage } from '@hookform/error-message';


export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [fileName, setFileName] = useState('未選擇檔案');
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
        api("Files").create(fData)
            .then(function (res) {
                alert("成功");
                window.location.reload();
            })
            .catch(function (err) {
                alert("失敗");
            });
    }

    const handlefileName = (e) => {
        var str = "";
        for (var i = 0, len = e.target.files.length; i < len; i++) {
            str += e.target.files[i].name + " ";
        }
        setFileName(str);
    }
    return (
        <Stack
            spacing={1}
            sx={{ width: "500px", margin: "30px auto" }}
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Paper
                sx={{ textAlign: 'center', }}
            >
                <h2>貼文</h2>
                {/* <img
                    id="blah"
                    src="#"
                    alt="your image"
                /> */}
                {/* <img
                    id="blah"
                    src={"#"}
                    loading="lazy"
                    alt="head"
                    style={{
                        borderRadius: "50%",
                        width: "150px",
                        height: "150px",
                    }}
                /> */}
                <form onSubmit={handleSubmit(onSubmit)}>

                    <TextField
                        type="text"
                        label="標題"
                        variant="filled"
                        sx={{ width: "90%", mt: 5 }}
                        {...register("imgTitle", { required: "請輸入標題" })}
                    />
                    <div style={{ width: "500px" }}>
                        <ErrorMessage
                            errors={errors}
                            name="imgTitle"
                            render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                        />
                    </div>
                    <h3>文章內容</h3    >
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="輸入吧"
                        style={{ width: "90%" }}
                        {...register("imgContext", { required: "請輸入文章內容" })}
                    />
                    <div style={{ width: "500px" }}>
                        <ErrorMessage
                            errors={errors}
                            name="imgContext"
                            render={({ message }) => <p style={{ color: "red" }}>{message}</p>}
                        />
                    </div>
                    <Button
                        variant="contained"
                        component="label"
                        size='large'
                        sx={{ width: "90%", mt: 5 }}
                    >
                        Upload File
                        <input
                            type='file'
                            label="File"
                            variant="outlined"
                            margin="normal"
                            accept="image/*"
                            onInput={handlefileName}
                            // onChange={showImg}
                            multiple
                            hidden
                            id="imgInp"
                            {...register('File', {
                                required: true,
                                validate: {
                                    maxMB: files => files[0]?.size < 10000000 || 'Max 10MB',
                                    acceptFormats: files =>
                                        ['image/jpeg', 'image/png', 'image/gif'].includes(
                                            files[0]?.type
                                        ) || 'Only PNG, JPEG e GIF',
                                },
                            })}
                        />
                    </Button>
                    <Typography variant="p" gutterBottom component="div">
                        <p>
                            {fileName}
                        </p>
                    </Typography>
                    <Button type="submit" variant="contained" size='large' sx={{ mb: 5 }}>送出</Button>
                </form>
            </Paper >
        </Stack >
    );
}