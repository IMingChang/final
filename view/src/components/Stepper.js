import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { Grid } from '@mui/material'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MobileStepper from '@mui/material/MobileStepper';


import api from '../api/api'


function SwipeableTextMobileStepper(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [count, setCount] = React.useState();
    React.useEffect(() => {
        setCount(props.count)
    }, [props.count])

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    const handleGood = (e) => {
        var id = e.target.getAttribute("data-key");
        api("Imgs/Count/" + id + "?count=1").countUpdata()
            .then(function (res) {
                console.log(res);
            })
        setCount(count + 1);
    }
    return (
        <>
            {props.images === undefined ? (
                <Skeleton variant="rectangular" width="100%" height={300} />
            ) : (
                <Box sx={{ flexGrow: 1 }}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 50,
                            pl: 2
                        }}
                    >
                        {/* <Typography>ccc</Typography> */}
                    </Paper>
                    <Box sx={{ width: "100%", flexGrow: 1 }}>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {props.images.map((step, index) => (
                                <div key={index}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 300,
                                                display: 'block',
                                                overflow: 'hidden',
                                                width: '100%',
                                            }}
                                            id={props.imgId}
                                            src={step}
                                        // alt={step}
                                        />
                                    ) : null}
                                </div>
                            ))}
                        </SwipeableViews>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                        >
                            <Grid item sx={{ display: "flex", textAlign: "left" }} xs={4}>
                                <FavoriteBorderIcon
                                    data-key={props.imgId}
                                    onClick={handleGood}
                                />
                                <CloudQueueIcon /><AirplanemodeActiveIcon />
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign: "center" }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <MobileStepper
                                        steps={props.images?.length}
                                        position="static"
                                        activeStep={activeStep}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign: "right" }}>
                                <LocalOfferIcon />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 1 }}>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {count == null ? 0 : count}人都說讚
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box >
                </Box >
            )}
        </>
    );
}

export default SwipeableTextMobileStepper;
