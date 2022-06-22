import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



import Stepper from '../components/Stepper'

import api from '../api/api'
import Appbar from './Appbar';

export default function StandardImageList() {

    const [itemData, setitemData] = useState(imgData)

    useEffect(() => {
        api("Imgs").read()
            .then(function (res) {
                for (var i = 0, len = Object.keys(res.data).length; i < len; i++) {
                    var str = res.data[i].imgUrl;
                    var imgList = str.split(",")
                    res.data[i].imgUrl = "http://localhost:5104/" + imgList[0];
                    var imgUrlList = [];
                    for (var z = 0, lenz = Object.keys(imgList).length; z < lenz; z++) {
                        if (z < imgList.length - 1) {
                            imgUrlList.push("http://localhost:5104/" + imgList[z]);
                        }
                    }
                    res.data[i].imgUrlList = imgUrlList;
                }
                setitemData(res.data);
            })
            .catch(function (error) {
            });
    }, [])
    function handleClick(e) {
        if (e.target.style.whiteSpace === "normal") {
            e.target.style.whiteSpace = 'nowrap';
        } else {
            e.target.style.whiteSpace = 'normal';
        }
    }

    function onSubmit(data, param, index) {
        var obj = {
            "messageName": localStorage.getItem('username'),
            "messageContext": document.querySelector('input[name="messages/' + param + '"]').value,
            "imgId": param,
        }
        api("Messages").create(JSON.stringify(obj))
            .then(function (res) {
            })
        var v = new Date(Date.now());
        console.log(Date.now());
        console.log(v);
        var time = new Date(v).getFullYear() + "-" + ("0" + (new Date(v).getMonth() + 1)).substr(-2) + "-" + ("0" + new Date(v).getDate()).substr(-2) + " " + new Date(v).getHours() + ":" + ("0" + new Date(v).getMinutes()).substr(-2) + ":" + ("0" + new Date(v).getSeconds()).substr(-2);
        var objTime = {
            "messageName": localStorage.getItem('username'),
            "messageContext": document.querySelector('input[name="messages/' + param + '"]').value,
            "imgId": param,
            "time": time
        }
        setitemData(prevState => ([
            ...prevState,
            prevState[index].messages.push(objTime)
        ]))
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

                <Grid >
                    {itemData.map((item, index) => (
                        <ImageList sx={{ width: 500 }} cols={1} rowHeight={380} key={index}>
                            <ImageListItem>
                                <Stepper images={item.imgUrlList} count={item.imgLoveCount} imgId={item.imgId} />
                            </ImageListItem>

                            <Typography variant="h5" gutterBottom component="div" sx={{ mt: 4 }}>
                                {item.imgTitle}
                                {item.imgId}
                            </Typography>

                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                                data-index={item.imgId}
                                onClick={handleClick}
                            >
                                {item.imgContext}
                            </Typography>
                            <Accordion>
                                <AccordionSummary
                                    aria-controls="panel1a-content"
                                    id="panel1a-content"
                                >
                                    <Typography>查看全部{item.messages?.length}留言</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        {item.messages?.map((value, num) => (
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
                                                    </React.Fragment>
                                                }
                                                secondary={value.time.replace("T", " ").slice(0, 18)}
                                            />
                                        ))}
                                        <Box key={index} sx={{ display: 'flex' }}>
                                            <TextField
                                                // label="Size"
                                                placeholder={"留言" + item.imgId}
                                                // data-index={item.imgId}
                                                id="outlined-size-small"
                                                size="small"
                                                sx={{ width: "100%" }}
                                                name={"messages/" + item.imgId}
                                            />
                                            <Button onClick={e => onSubmit(e, item.imgId, index)} variant="contained">留言</Button>
                                        </Box>
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                        </ImageList>

                    ))}

                </Grid>
            </Grid>
        </>
    );
}

const imgData = [
    {
        imgUrl: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        imgUrl: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];
