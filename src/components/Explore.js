import {getFirestore,collection,query,where,querySnapshot, onSnapshot} from "firebase/firestore";
import {getAuth,getUser} from "firebase/auth";
import {useEffect,useState} from "react";
const Explore=()=>{
    const [userArray,setUserArray]=useState([]);
    const db=getFirestore();
    const userRef=collection(db,'users');

    const fetchData=()=>{
        const q=query(userRef,where("userId","!=",undefined));
        onSnapshot(q,(querySnapshot)=>{
          const userTempArray=[];
          querySnapshot.forEach((doc)=>{
                userTempArray.push(doc.data().userId);
          });
          setUserArray(userTempArray);
          console.log(userArray);
        })
    }
    
    
    return(
        <div>
            {userArray.map((user)=>(
                <div key={user.id}>
                    <span>{user.userId}</span>
                </div>
            ))}

        </div>
    );
}
export default Explore;