import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid } from '@mui/material'
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import api from '../api/api'
import Appbar from './Appbar';

export default function StandardImageList() {
  const [itemData, setitemData] = useState()
  const [personData, setPersonData] = useState()
  useEffect(() => {
    api("Imgs").read()
      .then(function (res) {
        for (var i = 0, len = Object.keys(res.data).length; i < len; i++) {
          var str = res.data[i].imgUrl;
          var imgList = str.split(",")
          res.data[i].imgUrl = "http://localhost:5104/" + imgList[0];
          //console.log(res.data[i].imgUrl);
        }
        setitemData(res.data)
      })
      .catch(function (error) {
        console.log(error);
      });

    var account = localStorage.getItem('account')
    api("Users/" + account).read()
      .then(function (res) {
        setPersonData(res.data[0])
      })
  }, [])
  return (
    <>
      <Appbar />
      <Container maxWidth="sm">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            {personData === undefined ? (
              <Skeleton variant="rectangular" width={600} height={300} />
            ) : (
              <Box sx={{ flexGrow: 1, m: 5 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <img
                      src={"http://localhost:5104/" + personData.url}
                      loading="lazy"
                      alt="head"
                      style={{
                        borderRadius: "50%",
                        width: "150px",
                        height: "150px"
                      }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h6" component="div">
                      {personData.userName}
                    </Typography>
                    <Typography variant="h6" component="div">
                      0貼文 0位粉絲 0追蹤中
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {personData.profile}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}

          </Grid >

          <Grid item xs={12}>
            <Divider />
            {itemData === undefined ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
              <ImageList sx={{ maxWidth: 600, height: 600 }} cols={3} rowHeight={200}>
                {itemData?.map((item, index) => (
                  <Link
                    to={"/ShowImgDetail/" + item.imgId}
                    key={item.imgId}
                  >
                    <ImageListItem >

                      <img
                        src={item.imgUrl}
                        srcSet={item.imgUrl}
                        alt={item.imgUrl}
                        loading="lazy"
                        style={{
                          height: "200px"
                        }}
                      />

                    </ImageListItem>
                  </Link>
                ))}
              </ImageList>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
