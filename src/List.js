import React, { useState } from "react";
import { FaSort } from "react-icons/fa";
import "./Styling/List.css";

function List({ filterCoins, setRefresh, mode }) {
  const [sorted, setSorted] = useState(filterCoins);
  const [order, setOrder] = useState(true);
  const [input, setInput] = useState("");

  const sortPrice = (field) => {
    let sortedPrices = sorted.sort((a, b) => {
      if (a[field] < b[field]) {
        return order ? 1 : -1;
      }
      if (a[field] > b[field]) {
        return order ? -1 : 1;
      }
      return 0;
    });

    setOrder(!order);
    setSorted(sortedPrices);
    setRefresh(true);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const stopRender = (e) => {
    e.preventDefault();
  };

  const filteredCoins = sorted.filter(
    (coin) =>
      coin.symbol.toLowerCase().includes(input.toLowerCase()) ||
      coin.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="List">
      <div className="coin-search">
        <form onSubmit={(e) => stopRender(e)}>
          <input
            type="text"
            placeholder="search for a coin"
            className={`input-${mode}`}
            onChange={(e) => handleChange(e)}
          />
        </form>
      </div>
      <div className="list-container">
        <div className={`list-item-${mode}`}>
          <div className="item-content">
            <div className="name-img">
              <h3>Coin</h3>
            </div>
            <p className="coin-symbol">Code</p>
            <div className="coin-info top">
              <p
                className="coin-price"
                onClick={() => sortPrice("current_price")}
              >
                Value
                <FaSort />
              </p>
              <p
                className="coin-1h"
                onClick={() =>
                  sortPrice("price_change_percentage_1h_in_currency")
                }
              >
                1h
                <FaSort />
              </p>
              <p
                className="coin-24h"
                onClick={() => sortPrice("price_change_percentage_24h")}
              >
                24h
                <FaSort />
              </p>
              <p
                className="coin-7d"
                onClick={() =>
                  sortPrice("price_change_percentage_7d_in_currency")
                }
              >
                7d
                <FaSort />
              </p>
              <p
                className="coin-30d"
                onClick={() =>
                  sortPrice("price_change_percentage_30d_in_currency")
                }
              >
                30d
                <FaSort />
              </p>
              <p
                className="coin-1y"
                onClick={() =>
                  sortPrice("price_change_percentage_1y_in_currency")
                }
              >
                1y
                <FaSort />
              </p>
            </div>
          </div>
        </div>
        <div className="list-row">
          {filteredCoins.length <= 0 ? (
            <h3 className="error-search">Please repeat search</h3>
          ) : (
            filteredCoins.map((item) => {
              const {
                id,
                name,
                image,
                current_price,
                price_change_percentage_1h_in_currency,
                price_change_percentage_7d_in_currency,
                price_change_percentage_24h,
                price_change_percentage_30d_in_currency,
                price_change_percentage_1y_in_currency,
                symbol,
              } = item;
              return (
                <div key={id} className={`list-item-${mode}`}>
                  <div className="item-content">
                    <div className="name-img">
                      <h3>{name}</h3>
                      <img src={image} alt={name} />
                    </div>
                    <p className="coin-symbol">{symbol.toUpperCase()}</p>
                    <div className="coin-info">
                      <p className="coin-price">
                        £
                        {current_price < 1
                          ? current_price.toFixed(3)
                          : current_price > 10000
                          ? current_price.toFixed(0)
                          : current_price.toFixed(2)}
                      </p>
                      <p
                        className={`${
                          price_change_percentage_1h_in_currency > 0
                            ? "coin-1h percent-green"
                            : "coin-1h percent-red"
                        }`}
                      >
                        {price_change_percentage_1h_in_currency
                          ? price_change_percentage_1h_in_currency.toFixed(2) +
                            "%"
                          : "n/a"}
                      </p>
                      <p
                        className={`${
                          price_change_percentage_24h > 0
                            ? "coin-24h percent-green"
                            : "coin-24h percent-red"
                        }`}
                      >
                        {price_change_percentage_24h
                          ? price_change_percentage_24h.toFixed(2) + "%"
                          : "n/a"}
                      </p>
                      <p
                        className={`${
                          price_change_percentage_7d_in_currency > 0
                            ? "coin-7d percent-green"
                            : "coin-7d percent-red"
                        }`}
                      >
                        {price_change_percentage_7d_in_currency
                          ? price_change_percentage_7d_in_currency.toFixed(2) +
                            "%"
                          : "n/a"}
                      </p>
                      <p
                        className={`${
                          price_change_percentage_30d_in_currency > 0
                            ? "coin-30d percent-green"
                            : "coin-30d percent-red"
                        }`}
                      >
                        {price_change_percentage_30d_in_currency
                          ? price_change_percentage_30d_in_currency.toFixed(2) +
                            "%"
                          : "n/a"}
                      </p>
                      <p
                        className={`${
                          price_change_percentage_1y_in_currency > 0
                            ? "coin-1y percent-green"
                            : "coin-1y percent-red"
                        }`}
                      >
                        {price_change_percentage_1y_in_currency
                          ? price_change_percentage_1y_in_currency.toFixed(0) +
                            "%"
                          : "n/a"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
