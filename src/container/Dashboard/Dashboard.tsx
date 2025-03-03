import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import classes from "./Dashboard.module.css";
import DashboardSummary from "../DashboardSummary/DashboardSummary";
import GreetingComponent from "@/components/GreetingComponent/GreetingComponent";
import DashboardTables from "../DashboardTables/DashboardTables";

const Dashboard = () => {
  return (
    <DashboardLayout className={classes.container}>
      <GreetingComponent />
      <DashboardSummary />
      <DashboardTables />
    </DashboardLayout>
  );
};

export default Dashboard;
