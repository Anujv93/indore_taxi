"use client";
import { login, logout, selectUser } from "@feature/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "@firebase/config";
import Dashboard from "@app/admin/dashboard/page";
import Login from "@app/admin/login/page";
import { redirect } from "next/navigation";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            userEmail: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsuscribe;
  }, [dispatch]);

  return <div>{user ? redirect("/admin") : <Login />}</div>;
}

export default App;
