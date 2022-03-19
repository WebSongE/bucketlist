import {getFirestore,collection,getDocs} from "firebase/firestore";
import {getAuth,getUser} from "firebase/auth";
import {useEffect,useState} from "react";
const Explore=()=>{
    const [userArray,setUserArray]=useState([]);
    const db=getFirestore();
    const userRef=collection(db,'users');

    useEffect(()=>{
        const getData=async()=>{
            const userTempArray=await getDocs(userRef);
            console.log(userTempArray);
            setUserArray(userTempArray);
        }
        getData();
    });
    
    return(
        <div>
            {userArray.map((user)=>(
                <div>
                    <span>{user.userId}</span>
                </div>
            ))}

        </div>
    );
}
export default Explore;