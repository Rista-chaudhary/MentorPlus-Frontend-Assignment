import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Pricecard from "./components/Pricecard";

function App() {
  const [plansData, setPlansData] = useState([]);

  const timeoutVals = [600000, 900000, 48 * 24 * 60 * 1000, 3600000];
  //                    10 mins, 15 mins,    2 days,          1 hour

  useEffect(() => {
    fetch("http://demo3755793.mockable.io/plans")
      .then((response) => response.json())
      .then((data) => setPlansData(data));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="page-heading-container">
        Buy a plan and be interview ready!
      </div>
      <div className="pricecard-main-container">
        {plansData.map((item, index) => {
          return <Pricecard item={item} initialTime={timeoutVals[index]} />;
        })}
      </div>
    </div>
  );
}

export default App;
