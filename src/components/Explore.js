import {getFirestore,collection,getDocs} from "firebase/firestore";
import {getAuth,getUser} from "firebase/auth";
import {useEffect,useState} from "react";
const Explore=()=>{
    const [userArray,setUserArray]=useState([]);
    const db=getFirestore();
    const userRef=collection(db,'users');

    useEffect(()=>{
        const getData=async()=>{
            const data=await getDocs(userRef);
            const userTempArray=data.docs.map(doc=>({
                ...doc.data().userId,
                id:doc.id
            }));
            setUserArray(userTempArray);
            console.log(userArray);
        }
        getData();
    },[]);
    
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