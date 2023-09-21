import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../src/components/Home";
import Body from "../src/components/Body";
import Feed from "./components/Feed";
import Library from "./components/Library";
import Error from "./components/Error";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Album from "./components/Album";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./components/ForgotPass";
import { Provider } from "react-redux";
import store from "./utils/store";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/home",
        // element: <ProtectedRoute element={<Home />}></ProtectedRoute>,
        element: <Home />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/library",
        element: <Library />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/album",
        element: <Album />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <UserAuthContextProvider>
        <RouterProvider router={appRouter} />
      </UserAuthContextProvider>
    </Provider>
  );
}

export default App;
