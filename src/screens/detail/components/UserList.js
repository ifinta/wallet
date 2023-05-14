import {Chip} from "@mui/material";

export default function UserList({users}) {
    return (
        <>
            {users.map(user => {
                return (<Chip variant="outlined"
                              key={user.id} label={user.name}
                              onClick={()=>{
//                                  navigate(`/user/${user.id}`)
                              }}/>)
            })}
        </>
    )
}
