import useFetch from "../customHooks/useFetch";
import "./display.css";
import { useEffect, useState } from "react";

export default function Display() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const getData = async () => {
    const res = await useFetch(`https://dummyjson.com/products?limit=100`);

    if (res && res.products) {
      setData(res.products);
    }
  };

  useEffect(() => {
    getData();
    console.log("here");
    console.log(data);
  }, []);

  return (
    <div>
      <h2>Products</h2>

      {data.length > 0 && (
        <div className="products">
          {data.slice((page + 1) * 10 - 10, (page + 1) * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      <br />
      {data.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => {
              setPage(page - 1);
            }}
            style={page > 1 ? {} : { display: "none" }}
          >
            ◀
          </span>

          {[...Array(data.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => {
                  setPage(i);
                }}
                style={page == i ? { "background-color": "blue" } : {}}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            onClick={() => {
              setPage(page + 1);
            }}
            style={page == data.length / 10 - 1 ? { display: "none" } : {}}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
