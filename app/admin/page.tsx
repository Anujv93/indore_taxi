"use client";
import { logout, selectUser } from "@feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@firebase/config";

import { checkAuth } from "@utils/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  checkAuth();
  return (
    <h1>
      Dashboard {user?.userEmail}{" "}
      <button
        onClick={() => {
          auth.signOut().then(() => {
            dispatch(logout());
            console.log(user);
          });
        }}
      >
        Signout
      </button>
    </h1>
  );
}

export default App;
