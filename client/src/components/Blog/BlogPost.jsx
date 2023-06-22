import React from 'react';
import '../../_style/components/Blog/blogPost.scss';



const BlogPost = ({ post }) => {
    const { user_id, title, body, image, user } = post;
    // const { avatar } = user_id;
    // console.log(user.avatar)
    return (
        <div className="blog-post">
            <div className="blog-post-header">
                {user_id && (
                    <div className="blog-post-avatar-container">
                        <img className="blog-post-avatar" src={`http://127.0.0.1:8000/storage/${user.avatar}`} alt="" />
                    </div>
                )}
                
                <h2 className="blog-post-title">{title}</h2>
            </div>
            <p className="blog-post-body">{body}</p>
            {image && <img className="blog-post-image" src={image} alt="Blog post" />}

            <div className="comment-section">
                <h3>Comment:</h3>
                <textarea className='comment' type="text" placeholder="Your Comment" ></textarea>
                
                <button className="submit" type="submit">Submit</button>
            </div>
        </div>
    );
};

export default BlogPost;
