import React, { useState, useContext, useEffect } from 'react';
import client from '../client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../App';  // Assume your App component is one level up in the directory
import { UserContext } from '../App';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LifeMusicIcon from '../images/LifeMusicIcon.png';

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const LoginScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const { token, logout, CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT } = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      'email': email,
      'password':password,
    }

    // Ensure Axios sends cookies received from the server
    axios.defaults.withCredentials = true;

    client.post('login/', loginData)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        navigate('/login');
        console.log("login success")
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    // Send a request to the logout endpoint
    client.post('logout/')
      .then((response) => {
        navigate('/login');  // Redirect to the home page after logout
        console.log(response)
        setIsLoggedIn(false);
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
      // window.localStorage.removeItem("token"); 
  };

  // Check the login status on component mount
  useEffect(() => {
    console.log(user);
    client.get('isLoggedIn/')
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
        console.log(response)
        if (response.data.isLoggedIn) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);

  return (
    <div>
      {/* <h1>Display your Spotify profile data</h1>
      <section id="profile">
      <h2>Logged in as <span id="displayName"></span></h2>
      <span id="avatar"></span>
      <ul>
          <li>User ID: <span id="id"></span></li>
          <li>Email: <span id="email"></span></li>
          <li>Spotify URI: <a id="uri" href="#"></a></li>
          <li>Link: <a id="url" href="#"></a></li>
          <li>Profile Image: <span id="imgUrl"></span></li>
      </ul>
      </section> */}

      {/* <h1>Spotify Login</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )} */}

      {user ? (
        <div>
          
        {/* <h1>Spotify에 로그인하여 기능을 이용하세요</h1> */}
        {/* {!token ? (
          <a
            // href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            onClick={() => navigate('/spotifyProfile2')}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )} */}
        

        <h1>로그아웃</h1>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (

        


      //   <div>
      //     <h1>로그인 페이지</h1>
      //     <form onSubmit={handleSubmit}>
      //       <label>
      //         Email:
      //         <input
      //           name="email"
      //           type="email"
      //           placeholder='이메일을 입력하세요'
      //           value={email}
      //           onChange={(e) => setEmail(e.target.value)}
      //           required
      //         />
      //       </label>
      //       <br />
      //       <label>
      //         Password:
      //         <input
      //           name="password"
      //           type="password"
      //           placeholder='비밀번호를 입력하세요'
      //           value={password}
      //           onChange={(e) => setPassword(e.target.value)}
      //           required
      //         />
      //       </label>
      //       <br />
      //       <button type="submit">로그인</button>
      //     </form>
      //   </div>
      // )
      
      
    <ThemeProvider theme={defaultTheme}>
      
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'white' }}>
            {/* <LockOutlinedIcon /> */}
            <img src={LifeMusicIcon} alt="Life Music Icon" style={{ width: '60%', height: '60%' }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              name="email"
              type='email'
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              로그인
            </Button>
          </Box>
          {!token ? (
          // <a
          //   // href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          //   onClick={() => navigate('/spotifyProfile2')}
          // >
          //   Login to Spotify
          // </a>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: 'none', backgroundColor: '#1ED760', '&:hover': { backgroundColor: '#04B45F' }, color: 'white' }}
            onClick={() => navigate('/spotifyProfile2')}
          >
            
                       
            <img className="logo" alt="Logo auto layout" src={require('../images/logo-icon.svg').default} />
            <span style={{ marginRight: '0.5rem' }}>로 로그인하기</span> 

          </Button>
          
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        </Box>
        
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        
      />
      
    </Grid>

    
  </ThemeProvider>



      
      
      
      )}
    </div>
  );
};

export default LoginScreen;
