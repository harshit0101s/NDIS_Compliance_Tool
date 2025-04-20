import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>NDIS Compliance Tool</h1>
      <button onClick={() => navigate("/form")}>Generate Policy</button>
    </div>
  );
}
