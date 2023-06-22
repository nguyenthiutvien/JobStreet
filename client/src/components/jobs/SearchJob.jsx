import React, { useState } from 'react';
import axios from 'axios';
import '../../_style/components/Search.scss'

const SearchJob = () => {
    const [positions, setPositions] = useState([]);
    const [types, setTypes] = useState([]);
    const [address, setAddress] = useState('');

    const handlePositionChange = (position) => {
        if (positions.includes(position)) {
            setPositions(positions.filter((pos) => pos !== position));
        } else {
            setPositions([...positions, position]);
        }
    };

    const handleTypeChange = (type) => {
        if (types.includes(type)) {
            setTypes(types.filter((t) => t !== type));
        } else {
            setTypes([...types, type]);
        }
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('/api/jobs', {
                params: {
                    positions: positions.join(','),
                    types: types.join(','),
                    address: address,
                },
            });
            const jobs = response.data;
            // Xử lý dữ liệu công việc
            console.log(jobs);
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className='container'><br /><br /><br /><br />
            <div className='card'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <h5>Tìm theo vị trí công việc</h5>
                        <label>
                            <input
                                type="checkbox"
                                value="Design"
                                checked={positions.includes('Design')}
                                onChange={() => handlePositionChange('Design')}
                            />
                            <span className='text'>
                           Design
                            </span>
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="Java Dev"
                                checked={positions.includes('Java Dev')}
                                onChange={() => handlePositionChange('Java Dev')}
                            />
                            
                            <span className='text'>
                            Java Dev
                            </span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Fullstack"
                                checked={positions.includes('Fullstack')}
                                onChange={() => handlePositionChange('Fullstack')}
                            />
                            <span className='text'>
                            Fullstack
                            </span>
                           
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="ReactJS Dev"
                                checked={positions.includes('ReactJS Dev')}
                                onChange={() => handlePositionChange('ReactJS Dev')}
                            />
                            <span className='text'>
                            ReactJS Dev
                            </span>      
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Laravel Dev"
                                checked={positions.includes('Laravel Dev')}
                                onChange={() => handlePositionChange('Laravel Dev')}
                            />
                            <span className='text'>
                            Laravel Dev
                            </span>    
                        </label>
                    </div>
                    <div className='row'>
                        <h5>Tìm theo loại</h5>
                        <label>
                            <input
                                type="checkbox"
                                value="Full-time"
                                checked={types.includes('Full-time')}
                                onChange={() => handleTypeChange('Full-time')}
                            />
                            <span className='text'>
                            Full-time
                            </span> 
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Part-time"
                                checked={types.includes('Part-time')}
                                onChange={() => handleTypeChange('Part-time')}
                            />
                            <span className='text'>
                            Part-time
                            </span> 
                           
                        </label>
                    </div>
                    <div className='row'>
                        <h5>Tìm theo địa chỉ</h5>
                        <label>
                            <input
                                type="checkbox"
                                value="Đà Nẵng"
                                checked={types.includes('Đà Nẵng')}
                                onChange={() => handleAddressChange('Đà Nẵng')}
                            />
                            <span className='text'>
                            Đà Nẵng
                            </span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Hồ Chí Minh"
                                checked={types.includes('Hồ Chí Minh')}
                                onChange={() => handleAddressChange('Hồ Chí Minh')}
                            />
                            <span className='text'>
                            Hồ Chí Minh
                            </span>                           
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Hà Nội"
                                checked={types.includes('Hà Nội')}
                                onChange={() => handleAddressChange('Hà Nội')}
                            />
                            <span className='text'>
                            Hà Nội
                            </span>                            
                        </label>
                    </div>
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>


    );
};

export default SearchJob;
