import React from "react";
import { Link } from "react-router-dom";
const Navigation = ({ userObj }) => {
    return(
    <nav>
        <div>
            <Link to="/explore">explore</Link>
        </div>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{userObj? `${userObj.displayName}의 Profile`
      : "Profile"}</Link>
            </li>
            <li>
                <Link to="/bucket">add Bucket</Link>
            </li>
        </ul>
    </nav>
    );
}

export default Navigation;
