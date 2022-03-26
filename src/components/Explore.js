import {getFirestore,collection,query,where, onSnapshot} from "firebase/firestore";
import {useState} from "react";
const Explore=()=>{
    const [userArray,setUserArray]=useState([]);
    
    const db=getFirestore();
    const userRef=collection(db,'users');
    const q=query(userRef,where("userId","!=",null));
    onSnapshot(q,(querySnapshot)=>{
        const userTempArray=[];
        querySnapshot.forEach((doc)=>{
            userTempArray.push(doc.data());
        });
        setUserArray(userTempArray);
        console.log(userArray);
    });
    
    return(
        <div>
            {userArray.map((user)=>(
                <div key={user.userId}>
                    <span>{user.userId}</span>
                </div>
            ))}
        </div>
    );
}
export default Explore;