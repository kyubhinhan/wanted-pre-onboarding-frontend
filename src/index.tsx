import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const LayoutPage = lazy(() => import('./pages/LayoutPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const TodoPage = lazy(() => import('./pages/TodoPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'todo',
        element: <TodoPage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
