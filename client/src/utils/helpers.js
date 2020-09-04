import React from "react";
import { Link } from "react-router-dom";

export const RowGenerator = (lists, cols) => {
  const rows = [...Array(Math.ceil(lists.length / cols))];
  const articlesRows = rows.map((row, i) =>
    lists.slice(i * cols, i * cols + cols)
  );
  return articlesRows;
};

export const GenRowsWithB = (rows, type) =>
  rows.map((row, i) => (
    <div className="row" key={i}>
      {row.map((article) => (
        <div className={`${type} columns article_block`} key={article._id}>
          <Link to={`/article/${article._id}`}>
            <div className="top">
              <h3>{article.name}</h3>
            </div>
            <div className="content">
              <div>
                <span>Author: </span>
                {article.author}
              </div>
              <div>
                <span>Our Rating: </span>
                {article.ratings}
              </div>
              <div>
                <span>Price: </span>
                {article.price}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  ));
