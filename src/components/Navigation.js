import React from "react";

const Navigation = ({ userObj }) => 
<nav>
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/">{userObj.displayName} Profile</Link>
        </li>
    </ul>

</nav>

export default Navigation;
