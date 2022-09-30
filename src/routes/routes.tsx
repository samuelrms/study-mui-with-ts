import { CityList, Dashboard } from "../pages";

export const routes = [
  {
    label: "Página inicial",
    icon: "home",
    path: "/home",
    subPath: [],
    element: <Dashboard />,
  },
  {
    label: "Cidades",
    icon: "apartment",
    path: "/cidades",
    subPath: [],
    element: <CityList />,
  },
  // {
  //   label: "Detalhes",
  //   icon: "description",
  //   path: "/cidades/detalhes/:id",
  //   subPath: [],
  //   element: <CityList />,
  // },
];
