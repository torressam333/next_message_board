"use client";
import { useSession } from "next-auth/react";

const Profile = () => {
  const session = useSession();

  return session.data?.user ? (
    <div>From client: user is signed in {JSON.stringify(session)}</div>
  ) : (
    <div>From client: user is not signed in</div>
  );
};

export default Profile;
