import './App.css';
import CardMenu from "./CardMenu";
import ReviewMenu from "./ReviewMenu";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import Root from "./Root";
import LoginMenu from "./LoginMenu";
import SignupMenu from "./SignupMenu";
import Home from "./Home";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "",
                    element: <Home />
                },{
                    path: "deck/:deckId",
                    element: <CardMenu />
                },{
                    path: "review/:deckId",
                    element: <ReviewMenu />
                }
            ]
        },{
            path: "login",
            element: <LoginMenu />
        },{
            path: "signup",
            element: <SignupMenu />
        }
    ],{future:{v7_relativeSplatPath: true,v7_fetcherPersist: true,v7_normalizeFormMethod: true,
            v7_partialHydration: true,v7_skipActionErrorRevalidation: true}})
    return (
      <div className="background h-screen flex flex-col">
        <RouterProvider router={router} future={{v7_startTransition: true}}/>
      </div>
  );
}

export default App;
