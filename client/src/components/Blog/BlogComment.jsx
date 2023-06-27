import React, { useEffect, useState } from 'react'
import { userComment,getUserComment } from '../../api/Api';
import Swal from 'sweetalert2';
export const BlogComment = ({post,handelHiden}) => {
    const [commentBlog,setCommentBlog]=useState([])
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
               Swal.fire("Tuyệt vời","Bình luận thành công","success")
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
    
    
  
  return (
            <div className="blog-comment">
                <form  className='' onSubmit={handelComment} action="" method="post">
                    <div className="comment-section">
                        <h3>Comment</h3>
                        <textarea className="comment" name="content" type="text" placeholder="Your Comment"></textarea>
                        <input type="hidden" name="post_id" value={post.id} />
                        <div className='d-flex'>
                        <button className="btn btn-success" type="submit">Bình luận</button>
                        <button className="btn btn-danger ml-4" onClick={()=>handelHiden(false)} type="button">Hủy</button>
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
 

