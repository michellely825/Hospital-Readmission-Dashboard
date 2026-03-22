import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label,
} from "recharts";
import "./App.css";

const API_URL = "https://hospital-readmissions-api-production.up.railway.app";

const COLORS = [
  "#00d4ff",
  "#00ff88",
  "#7b61ff",
  "#ff6b6b",
  "#ffa500",
  "#00d4ff",
  "#00ff88",
  "#7b61ff",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#0d1829",
          border: "1px solid #1e3a5f",
          borderRadius: "8px",
          padding: "12px 16px",
          fontFamily: "DM Mono, monospace",
          fontSize: "0.8rem",
        }}
      >
        <p style={{ color: "#5a8a9f", marginBottom: "4px" }}>{label}</p>
        <p style={{ color: "#00d4ff", fontWeight: "600" }}>
          {payload[0].value}% readmission rate
        </p>
      </div>
    );
  }
  return null;
};

function App() {
  const [stats, setStats] = useState(null);
  const [diagnosisData, setDiagnosisData] = useState([]);
  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/patients/stats`)
      .then((response) => setStats(response.data));
    axios
      .get(`${API_URL}/patients/stats/by-diagnosis`)
      .then((response) => setDiagnosisData(response.data));
    axios
      .get(`${API_URL}/patients/stats/by-age`)
      .then((response) => setAgeData(response.data));
  }, []);

  if (!stats) return <div className="loading">LOADING DATA...</div>;

  const readmissionRate = (
    (stats.total_readmitted / stats.total_patients) *
    100
  ).toFixed(1);

  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-top">
          <div className="header-dot"></div>
          <h1>Hospital Readmissions Dashboard</h1>
        </div>
        <p>10-YEAR CLINICAL DATA · 130 US HOSPITALS · 1999–2008</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Patients</div>
          <div className="stat-value">
            {stats.total_patients.toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Readmission Rate</div>
          <div className="stat-value">
            {readmissionRate}
            <span>%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Hospital Stay</div>
          <div className="stat-value">
            {stats.average_time_in_hospital.toFixed(1)}
            <span>days</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Top Diagnosis</div>
          <div className="stat-value" style={{ fontSize: "1.3rem" }}>
            {stats.most_common_diagnosis}
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-title">Readmission Rate by Diagnosis</div>
          <div className="chart-subtitle">PRIMARY DIAGNOSIS · PERCENTAGE</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={diagnosisData}
              margin={{ top: 8, right: 8, left: -20, bottom: 60 }}
            >
              <XAxis
                dataKey="diag_1"
                tick={{ fill: "#5a8a9f", fontSize: 11, fontFamily: "DM Mono" }}
                angle={-35}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                tick={{ fill: "#5a8a9f", fontSize: 11, fontFamily: "DM Mono" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="readmission_rates" radius={[4, 4, 0, 0]}>
                {diagnosisData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Readmission Rate by Age Group</div>
          <div className="chart-subtitle">AGE BRACKET · PERCENTAGE</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={ageData}
              margin={{ top: 8, right: 8, left: -20, bottom: 60 }}
            >
              <XAxis
                dataKey="age"
                tick={{ fill: "#5a8a9f", fontSize: 11, fontFamily: "DM Mono" }}
                angle={-35}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                tick={{ fill: "#5a8a9f", fontSize: 11, fontFamily: "DM Mono" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="readmission_rates" radius={[4, 4, 0, 0]}>
                {ageData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import "./App.css";

// const API_URL = "https://hospital-readmissions-api-production.up.railway.app";

// function App() {
//   const [stats, setStats] = useState(null);
//   const [diagnosisData, setDiagnosisData] = useState([]);
//   const [ageData, setAgeData] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/patients/stats`)
//       .then((response) => setStats(response.data));

//     axios
//       .get(`${API_URL}/patients/stats/by-diagnosis`)
//       .then((response) => setDiagnosisData(response.data));

//     axios
//       .get(`${API_URL}/patients/stats/by-age`)
//       .then((response) => setAgeData(response.data));
//   }, []);

//   if (!stats) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Hospital Readmissions Dashboard</h1>

//       <p>Total Patients: {stats.total_patients}</p>
//       <p>Average Time in Hospital: {stats.average_time_in_hospital} days</p>
//       <p>Total Readmitted: {stats.total_readmitted}</p>
//       <p>Most Common Diagnosis: {stats.most_common_diagnosis}</p>

//       <h2>Readmission Rate by Diagnosis</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={diagnosisData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="diag_1" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="readmission_rates" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>

//       <h2>Readmission Rate by Age</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={ageData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="age" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="readmission_rates" fill="#82ca9d" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default App;
