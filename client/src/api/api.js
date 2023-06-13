import React from 'react';
import axios from 'axios';
import "../config";

export const fetchApiData = async (url) => {
  return await axios
    .get(url)
    .then((response) => response.data)
    .catch((response) => response.data);
};

export const storeApiData = async (url, data) => {
  return await axios
    .post(url, data)
    .then((response) => response.data)
    .catch((response) => response.response.data);
};

export const deleteApiData = async (url) => {
  return await axios
    .delete(url)
    .then((response) => response.data)
    .catch((response) => response.response.data);
};
export const postUser =async (e) => {
  return (
      await axios.post("http://127.0.0.1:8000/api/users",e)
  )
}
export const getUser = async ()=>{
  return (
    await axios.get("http://127.0.0.1:8000/api/users")
  )
}
export const confirmEmail = async (email)=>{
  return (
    await axios.get(`http://127.0.0.1:8000/api/users/${email}/edit`)
  )
}
export const recoverPassword=async (email)=>{
  return(
    await axios.put(`http://127.0.0.1:8000/api/users/${email}/confirm-email`)
  )
}
export const resetPassword=async(email,password)=>{
  return(
    await axios.put(`http://127.0.0.1:8000/api/users/${email}/change-pass`,password)
  )
}
export const userLogin=async(e)=>{
  return(
    await axios.post("http://127.0.0.1:8000/api/users/login",e)
  )
}
 








export const employeeLogin=async(e)=>{
  return(
    axios.post("http://127.0.0.1:8000/api/company/login",e)
  )
}
export const postCompany=async (employee)=>{
  return (
    await axios.post("http://127.0.0.1:8000/api/company",employee)
  )
}

export const getCompany=async ()=>{
  return (
    await axios.get("http://127.0.0.1:8000/api/company")
  )
}

export const confirmEmailEmployee = async (email)=>{
  return (
    await axios.get(`http://127.0.0.1:8000/api/company/${email}/edit`)
  )
}
export const recoverPasswordEmployee=async (email)=>{
  return(
    await axios.put(`http://127.0.0.1:8000/api/company/${email}/confirm-email`)
  )
}


export const resetPasswordEmployee=async(email,password)=>{
  return(
    await axios.put(`http://127.0.0.1:8000/api/company/${email}/change-pass`,password)
  )
}