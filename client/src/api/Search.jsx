import React, { useEffect, useState } from 'react'
import { fetchApiData } from '../api/Api'
const Search = () => {
    const [search,setSearch]=useState([])
    const [searchItem,setSearchItem]=useState([])

    useEffect(()=>{
        SearchIT()
       
    },[])
    useEffect(()=>{
        handelHome()
    },[search])
    const SearchIT=async()=>{
        const values=await fetchApiData('api/home/browse')
        setSearch(values.data.jobs)
    }
    const handelHome=()=>{
        const allJobs = search.map((item) => ({
            name: item.position,
            salary: item.salary
          }));
        setSearchItem(allJobs)
            
        
    }
    const handelFullStack=()=>{
        const FullStack=search.filter((item)=>item.position ==="FullStack")
        .map((item)=>({
                name: item.position,
                salary: item.salary
        }))
        setSearchItem(FullStack)
    }
  return (
    <>
      <div>
        <button onClick={handelHome}>tất cả</button>
        <button onClick={handelFullStack} >FullStack</button>
    </div>
    <div>
        {searchItem.map((item)=>(
            <>
            <p>{item.name}</p>
            <p>{item.salary}</p>
            </>
           
        ))}
       
    </div>
    </>
  
  )
}

export default Search
