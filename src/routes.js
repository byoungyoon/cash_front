/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import NoticePage from "views/Notice/Notice.js";
import LoginPage from "views/Login/Login.js";
import InfoPage from "views/Info/Info.js";
import CashbookPage from "views/Cashbook/Cashbook.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/cashbook",
    name: "Cashbook",
    rtlName: "إخطارات",
    icon: Notifications,
    component: CashbookPage,
    layout: "/admin"
  },
  {
    path: "/notice",
    name: "Notice",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NoticePage,
    layout: "/admin"
  },
  {
    path: "/Login",
    name: "Login",
    rtlName: "إخطارات",
    icon: Notifications,
    component: LoginPage,
    layout: "/admin"
  },
  {
    path: "/Info",
    name: "Info",
    rtlName: "إخطارات",
    icon: Notifications,
    component: InfoPage,
    layout: "/admin"
  },  
];

export default dashboardRoutes;
