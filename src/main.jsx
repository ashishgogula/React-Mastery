import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ToggleSwitch from './components/beginner/ToggleSwitch.jsx';
import Home from './components/Home.jsx';
import Beginner from './components/beginner/Beginner.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Counter from './components/beginner/Counter.jsx';
import ToDoList from './components/beginner/ToDoList.jsx';
import ShoppingCart from './components/beginner/ShoppingCart.jsx';
import UserProfileDemo from './components/beginner/UserProfileDemo.jsx';
import Password from './components/beginner/Password.jsx';
import MultiTabForm from './components/beginner/MultiTabForm.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:<ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />, // or whatever you want as landing
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'beginner',
        element: <Beginner />,
      },
      {
        path: 'beginner/toggle-switch',
        element: <ToggleSwitch />,
      },
      {
        path: 'beginner/counter',
        element: <Counter />,
      },
      {
        path: 'beginner/todo-list',
        element: <ToDoList />,
      },
      {
        path: 'beginner/shopping-cart',
        element: <ShoppingCart />,
      },
      {
        path: 'beginner/user-profile',
        element: <UserProfileDemo />,
      },
      {
        path: 'beginner/password',
        element: <Password />,
      },
      {
        path: 'beginner/multitab-form',
        element: <MultiTabForm />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
