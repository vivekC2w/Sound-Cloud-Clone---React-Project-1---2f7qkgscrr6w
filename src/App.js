import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../src/components/Home";
import Body from "../src/components/Body";
import Feed from "./components/Feed";
import Library from "./components/Library";
import Error from "./components/Error";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Upload from "./components/Upload";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Album from "./components/Album";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdatePassword from "./components/UpdatePass";
import { Provider } from "react-redux";
import store from "./utils/store";
import Hero from "./components/Hero";
import Search  from "./components/Search";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/home",
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
        path: "/updatepassword",
        element: <UpdatePassword />,
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
        path: "/upload",
        element: <Upload />,
      },
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/search",
        element: <Search />,
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
