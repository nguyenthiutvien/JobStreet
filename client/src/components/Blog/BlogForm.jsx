import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../_style/components/Blog/blogform.scss';
import Swal from 'sweetalert2';

const BlogForm = ({ handleShow }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const login=JSON.parse(localStorage.getItem('login'));
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
    const token=JSON.parse(localStorage.getItem("login"))    
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // Create a new FormData object
            const formData = new FormData();
            formData.append('token',token.token );
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

    const handelLogin=(e)=>{
        e.preventDefault();
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
        <>
            <div className="wraper" onClick={handleShow}></div>
            <div className='boder'>
                <form className="blog_form" onSubmit={handleSubmit}>
                    
                    <input type="text" placeholder="Chủ đề" value={title} onChange={handleTitleChange} required />
                    <textarea placeholder="Nội dung" value={body} onChange={handleBodyChange} required></textarea>
                    <input className="blog-post-image" type="file" onChange={handleImageChange} />
                    {login?
                    ( <button className='sub' type="submit">Thêm bài đăng</button>):
                    ( <button className='sub' onClick={handelLogin} type="buton">Thêm bài đăng</button>)}
                </form>
            </div>
        </>
    );
};

export default BlogForm;
