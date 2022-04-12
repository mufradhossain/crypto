import React, { useEffect, useState } from "react";
import "./Styling/App.css";
import List from "./List";
import Card from "./Card";
import Loader from "react-loader-spinner";
import { FaAngleDoubleUp, FaMobileAlt, FaSun, FaMoon } from "react-icons/fa";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C7d%2C30d%2C1y";

function App() {
  const [coins, setCoins] = useState([]);
  const [input, setInput] = useState("");
  const [view, setView] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("dark");

  const fetchdata = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRefresh(false);
      setCoins(data);
      setLoading(false);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchdata();
  }, [refresh]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const stopRender = (e) => {
    e.preventDefault();
  };

  const filterCoins = coins.filter(
    (coin) =>
      coin.symbol.toLowerCase().includes(input.toLowerCase()) ||
      coin.name.toLowerCase().includes(input.toLowerCase())
  );

  if (loading) {
    return <Loader type="Rings" color="#d10000" className="loader" />;
  }

  const modeSwitch = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.background = "black";
    } else if (mode === "dark") {
      setMode("light");
      document.body.style.background = "rgb(240, 240, 240)";
    }
  };

  return (
    <main className={`App-${mode}`}>
      <div className={`small-screen-${mode}`}>
        <p>Welcome to Top 100 Cryptocurrencies</p>
        <h2>Please Rotate Your Screen</h2>
        <FaMobileAlt className="icon" />
      </div>
      <div className="mode">
        {mode === "dark" ? (
          <FaSun onClick={modeSwitch} />
        ) : (
          <FaMoon onClick={modeSwitch} />
        )}
      </div>
      <h1 className="coin-text" id="#top">
        Crypto Currency Dashboard
      </h1>
      <article className="sub-heading">
        <h2>View type:</h2>
        <button
          className={`view-switch-${mode}`}
          onClick={() => setView(!view)}
        >
          {view ? "list" : "card"}
        </button>
      </article>

      {view ? (
        <h1> </h1>
      ) : (
        <div className="search-refresh">
          <div className="coin-search">
            <form onSubmit={stopRender}>
              <input
                type="text"
                placeholder="search for a coin"
                className={`input-${mode}`}
                onChange={handleChange}
              />
            </form>
          </div>
          <button
            className={`btn-refresh-${mode}`}
            onClick={() => setRefresh(true)}
          >
            Refresh
          </button>
        </div>
      )}

      {filterCoins.length > 0 ? (
        view ? (
          <List filterCoins={filterCoins} setRefresh={setRefresh} mode={mode} />
        ) : (
          <Card filterCoins={filterCoins} />
        )
      ) : (
        <h3 className="error-search">Please try again</h3>
      )}
      <a href="#top" aria-label='back to top' >
        <FaAngleDoubleUp className={`up-${mode}`} />
      </a>
    </main>
  );
}

export default App;
