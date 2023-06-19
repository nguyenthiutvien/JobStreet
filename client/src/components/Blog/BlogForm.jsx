import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../_style/components/Blog/blogform.scss';

const BlogForm = ({ handleShow }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    useEffect(() => {
        // Fetch the user's avatar based on their ID
        const fetchUserAvatar = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${user_id}/avatar`);
                setUserAvatar(response.data.avatar);
            } catch (error) {
                console.error('Error fetching user avatar:', error);
            }
        };

        fetchUserAvatar();
    }, []);

    const handleTitleChange = e => {
        setTitle(e.target.value);
    };

    const handleBodyChange = e => {
        setBody(e.target.value);
    };

    const handleImageChange = e => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            // Create a new FormData object
            const formData = new FormData();
            formData.append('user_id', 2);
            formData.append('title', title);
            formData.append('body', body);
            formData.append('image', image);

            // Send a POST request to the backend endpoint
          const status=  await axios.post('http://127.0.0.1:8000/api/add_posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                },
          });
            
            console.log(status.data)

            // Reset the form fields
            setTitle('');
            setBody('');
            setImage('');

            // Call handleShow to close the form and trigger a refresh of the blog posts
            handleShow();
        } catch (error) {
            console.error('Error adding blog post:', error);
            // Handle error, show an error message, etc.
        }
    };

    return (
        <>
            <div className="wraper" onClick={handleShow}></div>
            <form className="blog_form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Chủ đề" value={title} onChange={handleTitleChange} required />
                <textarea placeholder="Nội dung" value={body} onChange={handleBodyChange} required></textarea>
                <input className="blog-post-image" type="file" onChange={handleImageChange} />

                <button className='sub' type="submit">Thêm bài đăng</button>
            </form>
        </>
    );
};

export default BlogForm;
