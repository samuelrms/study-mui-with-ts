import { PeopleList, Dashboard, PeopleDetails } from "../pages";

export const routes = [
  {
    label: "Página inicial",
    icon: "home",
    className: "homePage",
    path: "/home",
    subPath: [],
    element: <Dashboard />,
  },
  {
    label: "Pessoas",
    icon: "groups",
    className: "people",
    path: "/pessoas",
    subPath: [],
    element: <PeopleList />,
  },
  {
    path: "/pessoas/detalhes/:id",
    label: "Detalhes",
    className: "detailsPeople",
    icon: "description",
    element: <PeopleDetails />,
  },
  {
    path: "/pessoas/detalhe/nova",
    label: "Nova pessoa",
    icon: "emoji_people",
    className: "newPeople",
    element: <PeopleDetails />,
  },
];
