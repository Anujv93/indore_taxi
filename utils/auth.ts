import { selectUser } from "@feature/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function checkAuth() {
  const user = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      console.log("Logged Out");
      router.push("/auth"); // Use the router to navigate
    }
  }, [user, router]);
}
