import React, { useEffect } from 'react';
// import { Container } from './styles';

export default function Client() {
  useEffect(()=>{
    window.location.pathname = ("/client/startPage/")
  },[])

  return <></>
}
