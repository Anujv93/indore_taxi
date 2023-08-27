"use client";
import { login, logout, selectUser } from "@feature/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "@firebase/config";

import Login from "@app/admin/login/page";
import { redirect } from "next/navigation";
import { Spinner } from "flowbite-react";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    const unsuscribe = auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            userEmail: userAuth.email,
          })
        );
        setisLoading(false);
      } else {
        dispatch(logout());
        setisLoading(false);
      }
    });
    return unsuscribe;
  }, [dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div>{user ? redirect("/admin") : <Login />})</div>
  );
}

export default App;
