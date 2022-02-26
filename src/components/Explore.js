import {getAuth} from "firebase/auth";
const SearchUsers=()=>{
    const userList=(nextPageToken)=>{
        getAuth()
        .listUsers(300,nextPageToken)
        .orderBy("expiredAt")
        .then((listUsersResult)=>{
            listUsersResult.users.forEach((userRecord)=>{
                console.log('user',userRecord.toJSON());
            });
            if(listUsersResult.PageToken){
                userList(listUsersResult.pageToken);
            }
        })
        .catch((error)=>{
            console.log('Error listing users:',error);
        });
    };
    return(
        <div>
            <button onClick={userList} value="search">search</button>
        </div>
    );
}
export default SearchUsers;