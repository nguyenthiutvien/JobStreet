

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

    const handleTitleChange = (e) => {
        console.log('t',e.target.value);
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        console.log('b',e.target.value);

        setBody(e.target.value);
    };

    const handleImageChange = (e) => {
        console.log('i', e.target.value);

        setImage(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the backend endpoint
            await axios.post('http://127.0.0.1:8000/api/add_posts', {
                user_id: 2,
                title: title,
                body: body,
                image: image
            },
                {
                headers: {
                    Accept: 'application/json'
                }
            });

            // Reset the form fields
            setTitle('');
            setBody('');
            setImage('');
            handleShow();

            // Optionally, show a success message or perform other actions
        } catch (error) {
            console.error('Error adding blog post:', error);
            // Handle error, show an error message, etc.
        }
    };

    return (
        <>
            <div className='wraper' ></div>
            <form className='blog_form' onSubmit={handleSubmit}>
                <input type="text" placeholder="Chủ đề" value={title} onChange={handleTitleChange} required />
                <textarea placeholder="Nội dung" value={body} onChange={handleBodyChange} required></textarea>
                <input className='blog-post-image' type="text" placeholder="Ảnh" value={image} onChange={handleImageChange} />
               
                <button type="submit" onClick={handleSubmit} >Thêm bài đăng</button>
            </form>
        </>
    );
};

export default BlogForm;
