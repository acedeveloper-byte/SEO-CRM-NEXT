import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useProfile } from "@common/UserHooks"; // Update the path if needed

export default function Index() {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { userProfile, loading } = useProfile();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Case 1: No token at all, go to login immediately
    if (!token) {
      router.push("/auth/login");
      return;
    }

    // Case 2: Token exists, but still loading profile — wait
    if (loading) return;

    // Case 3: Token exists, loading done, but no profile
    if (!userProfile) {
      dispatch({ type: "LOGOUT_USER" }); // Optional: Clear stale session
      router.push("/auth/login");
      return;
    }

    // Case 4: Token exists and user profile is valid
    router.push("/dashboard");
  }, [loading, userProfile, dispatch, router]);

  return null; // or <LoadingSpinner /> if you want a visual while redirecting
}
