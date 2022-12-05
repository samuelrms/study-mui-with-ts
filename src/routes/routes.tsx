import {
  PeopleList,
  Dashboard,
  PeopleDetails,
  CityDetails,
  CityList,
} from "../pages";

export const routes = [
  {
    path: "/home",
    label: "Página inicial",
    icon: "home",
    className: "homePage",
    subPath: [],
    element: <Dashboard />,
  },
  {
    path: "/pessoas",
    label: "Pessoas",
    icon: "groups",
    className: "people",
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
    path: "/cidades",
    label: "Cidades",
    icon: "business",
    className: "people",
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
