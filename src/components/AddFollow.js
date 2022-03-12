import getAuth from "firebase/auth";
const AddFollow=()=>{
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

            </div>
        </section>
    );
}
export default AddFollow;