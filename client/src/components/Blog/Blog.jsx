import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPost from './Blogpost';
import '../../_styles/pages/blog.scss';

const Blog = () => {
    const [blogPostsData, setBlogPostsData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [submittedComments, setSubmittedComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/posts');
                setBlogPostsData(response.data);
               
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = (e, postIndex) => {
        e.preventDefault();

        if (name && email && comment) {
            const newComment = {
                name,
                email,
                comment,
            };

            const updatedComments = [...submittedComments];
            updatedComments[postIndex] = updatedComments[postIndex]
                ? [...updatedComments[postIndex], newComment]
                : [newComment];

            setSubmittedComments(updatedComments);

            // Reset the form fields
            setName('');
            setEmail('');
            setComment('');
        }
    };

    return (
        <div className="blog">
            <h1 className="blog-title">Blog tìm việc làm</h1>
            <div className="blog-posts">
                {blogPostsData.map((post, index) => (
                    <div key={index} className="blog-post-container">
                        <BlogPost post={post} />
                    </div>
                ))}
                <div className="comment-section">
                    <h3>Comments</h3>
                    <form className="comment-form" onSubmit={(e) => handleSubmitComment(e)}>
                        <textarea  placeholder="Your Comment"  value={comment}  onChange={handleCommentChange}  required
                        ></textarea>
                        <input
                            type="text" placeholder="Your Name"  value={name}  onChange={handleNameChange} required
                        />
                        <input
                            type="email" placeholder="Your Email"  value={email} onChange={handleEmailChange}required
                        />
                        <button className="blog_submit" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Blog;






