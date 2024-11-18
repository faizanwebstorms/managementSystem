import { Card, CardContent, Typography } from "@mui/material";
import "../assets/css/dashboard.css";
import { FaDollarSign } from "react-icons/fa";
import DashboardChart from "../components/DashboardChart";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <Card className="card">
          <CardContent>
            <div className="d-flex gap-2 align-items-center justify-content-center mb-2">
              <FaDollarSign
                style={{
                  fontSize: "50px",
                  padding: "10px",
                  background: "lightgray",
                  borderRadius: "100%",
                }}
              />
              <Typography variant="h5">Today Deposit</Typography>
            </div>
            <Typography variant="h4">$82,373.21</Typography>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent>
            <div className="d-flex gap-2 align-items-center justify-content-center mb-2">
              <FaDollarSign
                style={{
                  fontSize: "50px",
                  padding: "10px",
                  background: "lightgray",
                  borderRadius: "100%",
                }}
              />
              <Typography variant="h5">Today Withdrawl</Typography>
            </div>
            <Typography variant="h4">7,234</Typography>
          </CardContent>
        </Card>
        <Card className="card">
          <CardContent>
            <div className="d-flex gap-2 align-items-center justify-content-center mb-2">
              <FaDollarSign
                style={{
                  fontSize: "50px",
                  padding: "10px",
                  background: "lightgray",
                  borderRadius: "100%",
                }}
              />
              <Typography variant="h5">Today Difference</Typography>
            </div>
            <Typography variant="h4">3.1M</Typography>
          </CardContent>
        </Card>
      </div>
      <div className="dashboard-graph">
        {/* Insert your graph component here */}
        <DashboardChart />
      </div>
    </div>
  );
};

export default Dashboard;
