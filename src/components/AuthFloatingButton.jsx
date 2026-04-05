import AvatarButton from "./AvatarButton";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "../context/auth-core";

const AuthFloatingButton = () => {
  const { user, loading } = useAuth();

  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      {loading ? (
        <div
          aria-hidden="true"
          className="h-12 w-12 rounded-full bg-white/10 animate-pulse"
        />
      ) : user ? (
        <AvatarButton />
      ) : (
        <GoogleLoginButton />
      )}
    </div>
  );
};

export default AuthFloatingButton;
