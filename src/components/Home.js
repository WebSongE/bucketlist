import React from "react";

const Home = () => {
    return (
        <div>
            <form>
                <input type="text" placeholder="Write your bucketlist" maxLength={120} />
            </form>
        </div>
    );
};

export default Home;