import React, { useState } from 'react';
import '../../_style/components/Blog/blogPost.scss';
const BlogPost = ({ post }) => {
    const { username,id, title, body, image, avatar } = post;
  
    
    return (
        <div className="blog-post">
            <div className="blog-post-header">
                {id && (
                    <div className="blog-post-avatar-container">
                        <img className="blog-post-avatar" src={`http://127.0.0.1:8000/storage/${avatar}`} alt="" />
                    </div>
                )}
                
                <p className="blog-post-title">{username}</p> <br />
                
            </div>
            <h5>{title}</h5>
            <p className="blog-post-body">{body}</p>
            {image && <img className="blog-post-image" src={`http://127.0.0.1:8000/storage/${image}`} alt="Blog post" />}
           
        </div>
    );
};

export default BlogPost;
