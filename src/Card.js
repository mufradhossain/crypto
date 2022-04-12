import React from "react";
import "./Styling/Card.css";

function Card({ filterCoins }) {
  return (
    <div className="card-container">
      {filterCoins.map((item) => {
        const {
          id,
          name,
          image,
          current_price,
          price_change_percentage_1h_in_currency,
          symbol,
          market_cap_rank,
        } = item;
        return (
          <div
            key={id}
            className={`${
              price_change_percentage_1h_in_currency > 0
                ? "card card-green"
                : "card card-red"
            }`}
          >
            <h3>{name}</h3>
            <div className="card-content">
              <div className="img-smn">
                <img src={image} alt={name} />
                <h4 className="card-symbol">{symbol}</h4>
              </div>
              <ul>
                <li>Market Cap</li>
                <li>Rank: {market_cap_rank}</li>
                <li>
                  £
                  {current_price < 1 ? current_price.toFixed(3) : current_price}
                </li>
                <li>
                  1h: {price_change_percentage_1h_in_currency? price_change_percentage_1h_in_currency.toFixed(2) + '%': 'n/a'}
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
