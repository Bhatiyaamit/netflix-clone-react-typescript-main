import { Navigate, createBrowserRouter } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

import MainLayout from "src/layouts/MainLayout";
import ProtectedRoute from "src/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: MAIN_PATH.root,
    lazy: () => import("src/pages/LandingPage"),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: MAIN_PATH.browse,
            lazy: () => import("src/pages/HomePage"),
          },
          {
            path: MAIN_PATH.genreExplore,
            children: [
              {
                path: ":genreId",
                lazy: () => import("src/pages/GenreExplore"),
              },
            ],
          },
          {
            path: MAIN_PATH.watch,
            lazy: () => import("src/pages/WatchPage"),
          },
          {
            path: MAIN_PATH.shows,
            lazy: () => import("src/pages/ShowsPage"),
          },
          {
            path: MAIN_PATH.movies,
            lazy: () => import("src/pages/MoviesPage"),
          },
          {
            path: MAIN_PATH.newPopular,
            lazy: () => import("src/pages/NewPopularPage"),
          },
          {
            path: MAIN_PATH.myList,
            lazy: () => import("src/pages/MyListPage"),
          },
          {
            path: MAIN_PATH.browseByLanguages,
            lazy: () => import("src/pages/BrowseByLanguagesPage"),
          },
          {
            path: MAIN_PATH.search,
            lazy: () => import("src/pages/SearchPage"),
          },
        ],
      },
    ],
  },
  {
    path: MAIN_PATH.signin,
    lazy: () => import("src/pages/SignInPage"),
  },
]);

export default router;
