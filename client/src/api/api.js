import React from 'react'
import axios from 'axios'
import "../config"

// //  FETCH API JOB 
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


export const UserChangePassword=async(id,password)=>{
  return (
    await axios.put(`http://127.0.0.1:8000/api/user/change-password/${id}`,password)
  )
}

export const companyChangePassword=async(id,password)=>{
  return (
    await axios.put(`http://127.0.0.1:8000/api/company/change-password/${id}`,password)
  )
}
//Application

export const getTokenUser = async (token)=>{
  return (
    await axios.post(`http://127.0.0.1:8000/api/user/get-token/${token}`)
  )
}
export const updateUser=async (id,formData)=>{
  return (
    await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`,formData)
  )
}


export const getApplications=async (email)=>{
  return (
      await axios.get(`http://127.0.0.1:8000/api/user/${email}/apply`)
    )
}
export const postApplication=async (formData)=>{
  return (
    await axios.post("http://127.0.0.1:8000/api/applications",formData)
  )
}


// export const getCV=async (name)=>{
//   return (
//     await axios.get(`http://127.0.0.1:8000/api/cv/${name}`)
//   )
// }
// Company Management

export const getTokenCompany= async (token)=>{
  return (
    await axios.post(`http://127.0.0.1:8000/api/company/get-token/${token}`)
  )
}
export const updateCompanyInfo=async (id,formData)=>{
  return (
    await axios.post(`http://127.0.0.1:8000/api/company/update/${id}`,formData)
  )
}

 export const getApplicationsCompany = async (token) => {
    return await axios.get(`http://127.0.0.1:8000/api/get-applications/${token}`);
};

export const getJobsCompany = async (token) => {
  return await axios.get(`http://127.0.0.1:8000/api/get-jobs/${token}`);
};

export const addJob = async (jobData) => {
 
  return  await axios.post(`http://127.0.0.1:8000/api/add-jobs`, jobData)
    

  
 
};
export const updateJob = async (token, jobId, jobData) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/update-jobs/${jobId}`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteJob = async (token, jobId) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/delete-jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const userComment=async(dataCommet)=>{
  return (
    await axios.post("http://127.0.0.1:8000/api/comment",dataCommet)
  )
}
export const getUserComment=async(post_id)=>{
  return (
    await axios.get(`http://127.0.0.1:8000/api/comment/${post_id}`)
  )
}