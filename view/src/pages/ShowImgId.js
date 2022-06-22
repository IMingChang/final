import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import Skeleton from '@mui/material/Skeleton';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ListItemText from '@mui/material/ListItemText';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Stepper from '../components/Stepper'

import api from '../api/api'
import Appbar from './Appbar';

export default function StandardImageList() {
    const params = useParams();
    const [itemData, setitemData] = useState()
    const { register, handleSubmit } = useForm();
    const [fileName, setFileName] = useState('未選擇檔案');

    useEffect(() => {
        api("Imgs/").readId(params.Id)
            .then(function (res) {
                var str = res.data.imgUrl;
                var imgList = str.split(",")
                res.data.imgUrl = "http://localhost:5104/" + imgList[0];
                var imgUrlList = [];
                for (var z = 0, lenz = Object.keys(imgList).length; z < lenz; z++) {
                    if (z < imgList.length - 1) {
                        imgUrlList.push("http://localhost:5104/" + imgList[z]);
                    }
                }
                res.data.imgUrlList = imgUrlList;
                setitemData(res.data);
            })
            .catch(function (error) {
            });
    }, [params.Id])
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
        api("Files/").updata(params.Id, fData)
            .then(function (res) {
                alert("成功");
                window.location.reload();
            })
            .catch(function (err) {
                alert("失敗");
            });
        // updata: (id, updataValue) => axios.put(url + id, updataValue),
    }
    const handlefileName = (e) => {
        var str = "";
        for (var i = 0, len = e.target.files.length; i < len; i++) {
            str += e.target.files[i].name + " ";
        }
        setFileName(str);
    }
    const onChangeHandler = e => {
        const { name, value } = e.target;
        setitemData(preState => ({ ...preState, [name]: value }));
    };
    const deleteImg = () => {
        api("imgs/").delete(params.Id)
            .then(function (res) {
                alert("成功");
                window.location.href = "http://localhost:3000/ShowImg";
            })
            .catch(function (err) {
                alert("失敗");
            });
    }
    const deleteButton = res => {
        api("messages/").delete(res)
            .then(function (res) {
                alert("成功");

            })
            .catch(function (err) {
                alert("失敗");
            });
    }
    const updateButton = res => {
        var messageContext = document.querySelector('input[name="messages/' + res + '"]').value;
        api("messages/MessageContext/" + res + "?&message=" + messageContext).countUpdata()
            .then(function (res) {
                alert("成功");
                window.location.reload();
            })
            .catch(function (err) {
                alert("失敗");
            });
    }
    return (
        <>
            <Appbar />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {itemData?.imgUrlList === undefined ? (
                    <Skeleton variant="rectangular" width={500} height={300} />
                ) : (
                    <Grid >

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ImageList sx={{ width: 500 }} cols={1} rowHeight={380}>
                                <ImageListItem>
                                    <Stepper images={itemData.imgUrlList} count={itemData.imgLoveCount} imgId={itemData.imgId} />
                                </ImageListItem>
                                <Typography variant="h5" gutterBottom component="div" sx={{ mt: 4 }}>
                                    <TextField
                                        type="text"
                                        label="標題"
                                        variant="filled"
                                        value={itemData.imgTitle}
                                        onInput={onChangeHandler}
                                        {...register("imgTitle")}
                                    />
                                </Typography>

                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                    data-index={itemData.imgId}
                                // onClick={handleClick}
                                >
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={3}
                                        placeholder="輸入吧"
                                        style={{ width: "90%" }}
                                        value={itemData.imgContext}
                                        onInput={onChangeHandler}
                                        {...register("imgContext")}
                                    />

                                </Typography>
                                <Button
                                    variant="contained"
                                    component="label"
                                    size='large'
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
                                        {...register('File')}
                                    />
                                </Button>
                                <Typography variant="p" gutterBottom component="div">
                                    <p>
                                        {fileName}
                                    </p>
                                </Typography>
                                <Accordion>
                                    <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-content"
                                    >
                                        <Typography>查看全部{itemData.messages?.length}留言</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            {itemData.messages?.map((value, num) => (
                                                <ListItemText
                                                    key={num}
                                                    primary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="div"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {value.messageName}：
                                                            </Typography>
                                                            {value.messageContext}
                                                            <TextField
                                                                type="text"
                                                                label="標題"
                                                                variant="filled"
                                                                name={"messages/" + value.messageId}
                                                            />
                                                            <IconButton aria-label="update" size="large" onClick={() => updateButton(value.messageId)}>
                                                                <CloudUploadIcon fontSize="inherit" />
                                                            </IconButton>
                                                            <IconButton aria-label="delete" size="large" onClick={() => deleteButton(value.messageId)}>
                                                                <DeleteIcon fontSize="inherit" />
                                                            </IconButton>


                                                        </React.Fragment>
                                                    }
                                                    secondary={value.time.replace("T", " ").slice(0, 18)}
                                                />
                                            ))}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Box
                                    sx={{ display: "flex" }}
                                >
                                    <Button type="submit" variant="contained" size='large' sx={{ mb: 5 }}>送出</Button>
                                    <Button startIcon={<DeleteIcon />} variant="contained" size='large' color="error" onClick={deleteImg} sx={{ mb: 5 }}>刪除</Button>
                                </Box>
                                {/* <Button size="sm" variant="contained" color="danger">
                                Danger
                            </Button> */}
                            </ImageList>
                        </form>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
