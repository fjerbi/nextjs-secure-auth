import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  return (
    <UserRoute>
      {user !== null && (
        <div>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        </div>
)}
    </UserRoute>
  );
};

export default UserIndex;
