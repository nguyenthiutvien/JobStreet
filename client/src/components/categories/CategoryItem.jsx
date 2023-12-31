import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ name, id }) => {
 
  return (
    <div className="category-container--card-wrapper__card">
      <img src="https://unicons.vn/wp-content/uploads/2017/07/Icon-student-png.png" alt="Category-icon" width="100px" height="100px" />
      { <Link to={`categories/jobs/${id}`}>
        <h1>{name}</h1>
      </Link> }
      
      {/* { <p>{count}</p>} */}
    </div>
  );
};

export default CategoryItem;
