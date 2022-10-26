import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setToken } from '../../redux/slices/sessionSlice';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import log_service from '../../services/log_service';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

// const pages = [ 'employees','departments', 'shifts', 'users', 'login'];
// const settings = ['dashboard', 'employees','departments', 'shifts', 'users', 'logout'];

const NavbarComp = () => {
  const navigate = useNavigate()
  const session = useSelector(state => state.session)
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [loggedin, setLoggedin] = React.useState(false);
  const [fullname, setFullname] = React.useState("");
  // eslint-disable-next-line no-unused-vars
  const [settings, setSettings] = React.useState(['dashboard', 'employees','departments', 'shifts', 'users', 'logout'])

  // eslint-disable-next-line no-unused-vars
  const [pages, setPages] = React.useState(['employees','departments', 'shifts', 'users', 'login'])

  useEffect(() => {
    if(session.session["token"]!==""){
      setFullname(`${session.session['user']['FirstName']} ${session.session['user']['LastName']}`)
      setLoggedin(true)
    }
    else {
      setLoggedin(false)
      setFullname("")
    }
  }, [session])
  

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

  const handleNavigate = (location) => {
    navigate(`/${location}`)
  }
  // const handle_log = () => {
    
  // }

  return (
   <ThemeProvider theme={darkTheme}>
     <AppBar position="static" color='primary'>
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              {pages.map((page) => {
                if ((page!=='login') || (page === 'login' && !loggedin)){
                  const p = page
                  return <MenuItem 
                  style={{textTransform: 'capitalize'}}
                  key={page} 
                  onMouseDown={handleCloseNavMenu}
                  onClick={()=>{
                    log_service.logEvent(session.session, `navigate to ${p}`)
                    handleNavigate(p)
                    // navigate(p)
                  }}
                  >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem> 
              }
              else return <span key={page}></span>
              
              
              })}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={(e)=>{
              e.preventDefault()
              handleNavigate("dashboard")
              // navigate('/dashboard')
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              const p = page
              if ((page!=='login') || (page === 'login' && !loggedin))
                return <Button
                  style={{textTransform: 'capitalize'}}
                  key={page}
                  onClick={()=>{
                    handleNavigate(page)
                    // navigate(`/${page}`)
                  }}
                  onMouseDown={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              else return <span key={page}></span>
            })}
          </Box>
          {loggedin? <Box sx={{ flexGrow: 0 }}> 
                        {fullname}
                      </Box>: 
                      <Box></Box>
          }
          {loggedin? <Box sx={{ flexGrow: 0, m:2 }}>
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
              {settings.map((setting) => (
                <MenuItem 
                  key={setting} 
                  onMouseDown={handleCloseUserMenu} 
                  style={{textTransform: 'capitalize'}} 
                  onClick={()=>{
                    if(setting === "logout"){
                      sessionStorage["token"] = ""
                      dispatch(setToken(""))
                      setLoggedin(false)
                      handleNavigate("login")
                      // navigate("/login")
                    }
                    else{
                      // console.log(`/${setting}`);
                      handleNavigate(setting)
                      // navigate(`/${setting}`)
                    }
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>: <Box sx={{ flexGrow: 0, m:2 }}></Box>}
          
        </Toolbar>
      </Container>
    </AppBar>
   </ThemeProvider>
  );
};
export default NavbarComp;
