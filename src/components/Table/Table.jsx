import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";
export const UserTable = () => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setTableData(response.data);
      })
      .catch(() => {
        setTableData(null);
      });
  }, []);

  if (!tableData) return <></>;

  return (
    <table>
      <caption>User Data</caption>

      <thead>
        <tr>
          {Object.entries(tableData[0]).map((value) => innerMapKeys(value))}
        </tr>
      </thead>

      <tbody>
        {/* get nested data */}
        {tableData.map((data, i) => (
          <tr key={`${data},${i}`}>
            {Object.entries(data).map((value) => innerMap(value))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Maps values ( for rows ), includes nested values
const innerMap = (data) => {
  if (typeof data[1] === "object") {
    return Object.entries(data[1]).map((val) => {
      return innerMap(val);
    });
  }
  return (
    <td data-label={data[0]} key={`${data[1]}`}>
      {data[1]}
    </td>
  );
};

// Maps Keys ( for header ), includes nested values
const innerMapKeys = (data) => {
  if (typeof data[1] === "object") {
    return Object.entries(data[1]).map((val) => {
      return innerMapKeys(val);
    });
  }
  return (
    <th scope="col" key={`${data[0]}`}>
      {data[0]}
    </th>
  );
};
