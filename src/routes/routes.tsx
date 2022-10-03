import { PeopleList, Dashboard } from "../pages";

export const routes = [
  {
    label: "Página inicial",
    icon: "home",
    path: "/home",
    subPath: [],
    element: <Dashboard />,
  },
  {
    label: "Pessoas",
    icon: "groups",
    path: "/pessoas",
    subPath: [],
    element: <PeopleList />,
  },
  // {
  //   label: "Detalhes",
  //   icon: "description",
  //   path: "/cidades/detalhes/:id",
  //   subPath: [],
  //   element: <CityList />,
  // },
];
