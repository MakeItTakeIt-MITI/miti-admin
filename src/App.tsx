import { Outlet } from "react-router-dom";

function App() {
  // const { isLoggedIn } = useUserStore();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/");
  //   } else {
  //     navigate('/dashboard')
  // }
  // }, [navigate, isLoggedIn]);
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
