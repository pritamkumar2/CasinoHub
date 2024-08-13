import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SportCatagory from "./components/sport-catagory/SportCatagory";
import SingleMatch from "./components/singleMatch/SingleMatch";
import Slots from "./components/casino/slotsgame/Slots";
import Game from "./components/casino/aviator/Game";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/catagory/:sportCatagory",
        element: <SportCatagory></SportCatagory>,
      },
      {
        path: "/catagory/match/:id/:sports",
        element: <SingleMatch></SingleMatch>,
      },
      {
        path: "/casino/slots",
        element: <Slots></Slots>,
      },
      {
        path: "/casino/Aviator",
        element: <Game></Game>,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn></SignIn>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
]);

export default router;
