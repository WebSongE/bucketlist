import { getAuth } from "firebase/auth";
const SearchUsers=()=>{
    const userList=(nextPageToken)=>{
        getAuth()
        .listUsers(1000,nextPageToken)
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
        <section>
            <div>
                <button onClick={userList}/>
            </div>
        </section>
    );
}
export default SearchUsers;