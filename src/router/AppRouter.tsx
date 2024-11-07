import { ErrorPage } from '@pages/ErrorPage/ErrorPage';
import { MainLayout } from '@pages/MainLayout/MainLayout';
import { MainPage } from '@pages/MainPage/MainPage';
import { MobilePage } from '@pages/Mobile/MobilePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routerSchema = createBrowserRouter([
  {
    Component: MainLayout,
    path: '/',
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'mobile',
        element: <MobilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export const AppRouter = () => <RouterProvider router={routerSchema} />;
