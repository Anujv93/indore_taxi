import React from "react";
import { auth } from "@firebase/config";
import { useSelector } from "react-redux";
import { selectUser } from "@feature/userSlice";

function Dashboard() {
  const user = useSelector(selectUser);

  return (
    <div>
      <h2>{user?.userEmail}</h2>
      <button onClick={() => auth.signOut()}>Signout</button>
    </div>
  );
}

export default Dashboard;
