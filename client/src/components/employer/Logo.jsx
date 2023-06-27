import React from 'react';

const Header = ({ companyName, logo }) => {
  return (
    <div className="tabbar--image">
      <div className="image--profile">
        <img src={`http://127.0.0.1:8000/storage/${logo}`} alt="" />
      </div>
      <div className="user--name">
        <p>{companyName}</p>
      </div>
    </div>
  );
};

export default Header;
