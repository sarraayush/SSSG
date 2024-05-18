import React, { useEffect, useState } from 'react';

const DataPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/file/get_file?page=${page}`);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Data Page</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>CreditScore</th>
            <th>CreditLines</th>
            <th>MaskedPhoneNumber</th>
            <th>SubscriptionPrice</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Email}</td>
              <td>{item.Name}</td>
              <td>{item.CreditScore}</td>
              <td>{item.CreditLines}</td>
              <td>{item.MaskedPhoneNumber}</td>
              <td>{item.SubscriptionPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevPage}>Prev</button>
        <span>{page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default DataPage;
