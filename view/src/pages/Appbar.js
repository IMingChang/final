import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { Link } from "react-router-dom";
//import { Home } from '@mui/icons-material';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


const Main = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "white" }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: 130 }}
                        src="/favicon.png"
                        alt="圖片"
                        loading="lazy"
                    />
                    <Search sx={{ backgroundColor: "#eeeeee" }}>
                        <SearchIconWrapper sx={{ color: "#9e9e9e" }}>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            sx={{ color: "#757575" }}
                            placeholder="搜尋"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of curren   t user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* {props.pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))} */}
                        </Menu>
                    </Box>
                    <Box
                        component="img"
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: 130 }}
                        src="/favicon.png"
                        alt="圖片"
                        loading="lazy"
                    />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>
                    {/* <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {props.pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ color: 'black' }}
                            >
                                <Link
                                    to={page === "Home" ? "/" : page}
                                    style={{
                                        color: "black",
                                        textDecoration: "none"
                                    }}
                                >
                                    {page}
                                </Link>
                            </Button>
                        ))}
                    </Box> */}

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        <Link to={"/ShowImgDetail"}>
                            <IconButton size="large">
                                <HomeIcon sx={{ color: "black" }} />
                            </IconButton>
                        </Link>
                        <Link to={"/Home"}>
                            <IconButton size="large">
                                <SendIcon sx={{ color: "black" }} />
                            </IconButton>
                        </Link>
                        <Link to={"/AddPost"}>
                            <IconButton size="large">
                                <AddBoxIcon sx={{ color: "black" }} />
                            </IconButton>
                        </Link>
                        <Link to={"/Home"}>
                            <IconButton size="large" >
                                <ExploreIcon sx={{ color: "black" }} />
                            </IconButton>
                        </Link>
                        <Link to={"/Home"} >
                            <IconButton size="large">
                                <FavoriteBorderIcon sx={{ color: "black" }} />
                            </IconButton>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Link
                                style={{ textDecoration: 'none' }}
                                to="/ShowImg"
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography
                                        textAlign="center"
                                        sx={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}>
                                        個人檔案
                                    </Typography>
                                </MenuItem>
                            </Link>
                            <Link
                                style={{ textDecoration: 'none' }}
                                to="/Setting"
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography
                                        textAlign="center"
                                        sx={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}>
                                        設定
                                    </Typography>
                                </MenuItem>
                            </Link>
                            <Link
                                style={{ textDecoration: 'none' }}
                                to="/"
                                onClick={() => {
                                    localStorage.setItem('userIsLogin', false)
                                    localStorage.setItem('username', '')
                                    localStorage.setItem('account', '')
                                    // window.location.href="http://localhost:3000/";
                                }}>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography
                                        textAlign="center"
                                        sx={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}>
                                        登出
                                    </Typography>
                                </MenuItem>
                            </Link>


                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>


    );
};
export default Main;
