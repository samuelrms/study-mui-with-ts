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
  {
    path: "/pessoas/detalhes/:id",
    label: "Detalhes",
    icon: "description",
    element: <Dashboard />,
  },
];
