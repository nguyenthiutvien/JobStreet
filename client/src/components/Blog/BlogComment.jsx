import React, { useEffect, useState } from 'react'
import { userComment,getUserComment } from '../../api/Api';
import { Form,Button,Input,Modal } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';
export const BlogComment = ({post,handelHiden}) => {
    const navigate=useNavigate()
    const [commentBlog,setCommentBlog]=useState([])
    const login=JSON.parse(localStorage.getItem("login"))
    const handelComment=async(e)=>{
        e.preventDefault()
        const tokens=JSON.parse(localStorage.getItem("login"))
        const post_id=e.target.post_id.value;
        const comment=e.target.content.value;
        const token=tokens.token
        const dataCommet={
            token:token,
            post_id:post_id,
            content:comment
        }
        if(comment!==""){
            const res=await userComment(dataCommet)
            if(res.status===200){
               Swal.fire({
                title:"Thành công",
                text:"Bình luận thành công",
                icon:"success"
               }).then(()=>{
                window.location.href = "/blog"
               })
               
            }else{
                Swal.fire("Thất bại","Không thành công","error")
            }
        }
        
    }
    useEffect(()=>{
        const userComent=async()=>{
            const res=await getUserComment(post.id)
            setCommentBlog(res.data)
        }
        userComent()
    },[]
    )
    
    const handelLogin=(e)=>{
        e.preventDefault()
        Swal.fire({
            title:"Đăng nhập",
            text:"Vui lòng đăng nhập trước khi bình luận",
            icon:"warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Không",
            confirmButtonText: "Đăng nhập",
        }).then((result)=>{
            if(result.isConfirmed){
            navigate("/loginUser")
            }
        })
    }
  return (
            <div className="blog-comment">
                <form  className='' onSubmit={handelComment} action="" method="post">
                    <div className="comment-section">
                        <h3>Comment</h3>
                        
                        <textarea rows={6} className="comment" name="content" type="text" placeholder="Your Comment"></textarea>
                       
                       
                        <input type="hidden" name="post_id" value={post.id} />
                        <div className='d-flex'>
                        {login?
                        (<button className="btn btn-post" htmlType="submit">Bình luận</button>):
                        (<button className="btn btn-post" onClick={handelLogin} htmlType="button">Bình luận</button>)}
                        
                        <button className="btn btn-cancel" onClick={()=>handelHiden(false)} type="button">Hủy</button>
                        </div>
                    </div>
                    <div className="comment-list-section">
                        {commentBlog.map((value) => (
                            <div className="comment--backlog">
                            <img src={`http://127.0.0.1:8000/storage/${value.avatar}`} alt="" />
                            <h6>{value.username}</h6>
                            <p>{value.content}</p>
                            </div>
                        ))}
                    </div>
                </form>
            </div>

  
        
    )
    }
 

