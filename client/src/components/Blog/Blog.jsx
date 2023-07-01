import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPost from './BlogPost';
import BlogForm from './BlogForm';
import { BlogComment } from './BlogComment';
import '../../_style/components/Blog/blog.scss';4
import '../header/Header';
import '../footer/Footer';
import Nav from '../header/Nav'
import Footer from '../footer/Footer';

const Blog = () => {
    const [blogPostsData, setBlogPostsData] = useState([]);
    const [show, setShow] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
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
    const handleShow = () => {
        setShow(!show)
    }
    const handelComment=()=>{

    }

    return (
        <>
        {/* <Nav/> */}
            {show && <BlogForm handleShow={handleShow} />}
            <div className="blog">
                <h1 className="blog-title">Blog tìm việc làm</h1>
                <div class="header_post">
                    <button class="button_post" onClick={handleShow}>Đăng bài</button>
                </div>

                <div className="blog-posts">
                    {blogPostsData.map((post, index) => (
                        <>
                        <div key={index} className="blog-post-container">
                            <BlogPost post={post} />
                            <p className='click--comment' onClick={()=>{
                                    setOpenModel(true)
                                    setSelectedProductId(post.id)
                            }}>Bình luận</p>
                        </div>
                        <div className="comment-section">
                            {openModel==true && selectedProductId==post.id && <BlogComment handelHiden={setOpenModel}  post={post}/>}
                        </div>
                    </>
                    ))}
                    
                </div>
            </div>
            {/* <Footer/> */}
        </>
    );
};

export default Blog;






