import Login from "../components/auth/Login";
import miti from "../assets/logo.svg";
import "../components/auth/animate.css";

const Auth = () => {
  return (
    <main className="h-screen w-full flex items-center">
      <div className="w-full h-full bg-black flex items-center justify-center">
        <img src={miti} alt="miti" className="size-[100px] turn-scale" />
      </div>
      <Login />
    </main>
  );
};

export default Auth;
