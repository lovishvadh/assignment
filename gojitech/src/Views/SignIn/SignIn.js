import React, { useState, useEffect } from 'react';
import Button from '@atlaskit/button';
import { login } from '../../ApiService/auth';

function SignIn({ location, history }) {
let authURL = `https://id.twitch.tv/oauth2/authorize?client_id=p5tkpvmr51c7grjszz8rcrwf413vah&redirect_uri=http://localhost:3000/sign-in/&response_type=token&scope=channel:read:subscriptions%20user:read:email`;

useEffect(() => {
  let accessToken = new URLSearchParams(location.hash.replace("#","")).get('access_token');
  let error = new URLSearchParams(location.search).get('error');
  let errorDescription = new URLSearchParams(location.search).get('error_description');
  if(error) {
    alert(errorDescription);
  } else if(accessToken){
    handleLogin(accessToken);
  }
  return () => {};
}, []);

const handleLogin = async (accessToken) => {
  localStorage.setItem('twitchAccessToken', accessToken);
  const res = await login(accessToken);
  console.log(res);
  if(res.status) {
    localStorage.setItem('jwt', res.data.accessToken);
    history.push('/');
  } else {
    alert("Authentication Error.");
  }
}

  return (
    <div style={{display: "flex", height: "100vh", flexDirection :"column", justifyContent: "center", alignItems: "center"}}>
      <div style={{flex:1, justifyContent: "center", alignItems: "center", display: "flex"}}>
        <p style={{fontFamily: 'Syne Mono', fontSize: "3rem"}}>Goji Tech</p>
      </div>
      <div style={{flex: 1}}>
        <a href={authURL} style={{ textDecoration: "none" }}>
        <Button style={{ fontFamily: 'Syne Mono', backgroundColor: "#6442A4"}}><span style={{ color:"white" }}>Log in using Twitch</span></Button>
        </a>
      </div>
    </div>
  );
}

export default SignIn;