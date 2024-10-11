/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import { AgGridReact } from "ag-grid-react";
import Table from "components/Table/Table";
import { useState } from "react";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Table
          entity="products"
          colDefs={[
            { field: "id" },
            { field: "title" },
            { field: "price" },
            { field: "is_available" },
            { field: "created_at" },
            { field: "user_id" },
          ]}
          fields={[
            { name: "title", label: "Заголовок", type: "text", default: "" },
            { name: "price", label: "Цена", type: "number", default: 0 },
            { name: "userId", label: "User ID", type: "text", default: "" },
            { name: "is_available", label: "Доступен", type: "boolean", default: false },
          ]}
        />
      </MDBox>
      <MDBox py={3}>
        <Table
          entity="users"
          colDefs={[
            { field: "id" },
            { field: "first_name" },
            { field: "last_name" },
            { field: "created_at" },
          ]}
          fields={[
            { name: "first_name", label: "Имя", type: "text", default: "" },
            { name: "last_name", label: "Фамилия", type: "text", default: "" },
          ]}
        />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
