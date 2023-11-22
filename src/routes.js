import Lawyer from "views/components/lawyer/Index.js"

var routes = [
  {
    path: "/lawyer",
    name: "Lawyer",
    icon: "fa fa-user text-blue",
    component: <Lawyer />,
    layout: "/admin",
  }
];
export default routes;
