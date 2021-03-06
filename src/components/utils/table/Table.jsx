import React, { useState, useEffect } from "react";

import "./table.css";

const Table = (props) => {
  const initDataShown =
    props.limit && props.bodyData
      ? props.bodyData.slice(0, Number(props.limit))
      : props.bodyData;

  const [dataShown, setDataShown] = useState(initDataShown);

  useEffect(() => {
    setDataShown(initDataShown);
  }, [props.bodyData]);

  let pages = 1;
  let range = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShown(props.bodyData.slice(start, end));

    setCurrPage(page);
  };

  const onNext = () => {
    let page = currPage < range.length - 1 ? currPage + 1 : range.length - 1;
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShown(props.bodyData.slice(start, end));
    setCurrPage(page);
  };

  const onPrev = () => {
    let page = currPage > 0 ? currPage - 1 : currPage;
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShown(props.bodyData.slice(start, end));
    setCurrPage(page);
  };

  return (
    <div>
      <div className="table-wrapper">
        <table>
          {props.headData && props.renderHeader ? (
            <thead>
              <tr>
                {props.headData.map((item, index) =>
                  props.renderHeader(item, index)
                )}
              </tr>
            </thead>
          ) : null}
          {props.bodyData && props.renderBody ? (
            <tbody>
              {dataShown.map((item, index) => {
                return props.renderBody(item, index, currPage, props.limit);
              })}
            </tbody>
          ) : null}
        </table>
      </div>

      {pages > 1 ? (
        <div className="table__pagination">
          <div
            className="table__pagination-btn table__pagination-item"
            onClick={onPrev}
          >
            {"<"}
          </div>
          {range.map((item, index) => (
            <div
              className={`table__pagination-item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => {
                selectPage(index);
              }}
              key={index}
            >
              {item + 1}
            </div>
          ))}
          <div
            className="table__pagination-btn table__pagination-item"
            onClick={onNext}
          >
            {">"}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Table;
