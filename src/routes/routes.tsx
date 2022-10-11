import {
  PeopleList,
  Dashboard,
  PeopleDetails,
  CityDetails,
  CityList,
} from "../pages";

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
  {
    label: "Cidades",
    icon: "business",
    className: "people",
    path: "/cidades",
    subPath: [],
    element: <CityList />,
  },
  {
    path: "/cidades/detalhes/:id",
    label: "Detalhes",
    className: "detailsPeople",
    icon: "description",
    element: <CityDetails />,
  },
  {
    path: "/cidades/detalhe/nova",
    label: "Nova Cidade",
    icon: "apartment",
    className: "newPeople",
    element: <CityDetails />,
  },
];
