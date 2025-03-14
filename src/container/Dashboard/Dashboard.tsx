import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import classes from "./Dashboard.module.css";
import DashboardSummary from "../DashboardSummary/DashboardSummary";
import GreetingComponent from "@/components/GreetingComponent/GreetingComponent";
import DashboardTables from "../DashboardTables/DashboardTables";
import DashboardStats from "../DashboardStats/DashboardStats";

const Dashboard = () => {
  return (
    <DashboardLayout className={classes.container}>
      <GreetingComponent />
      <DashboardSummary />
      <DashboardStats />
      <DashboardTables />
    </DashboardLayout>
  );
};

export default Dashboard;
