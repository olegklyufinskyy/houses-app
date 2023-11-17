import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const MOCK_API_URL = 'https://654babf05b38a59f28ef7ea3.mockapi.io/houses';

const HouseList = ({ houses, onDelete }) => (
  <div>
    <h2>Houses</h2>
    <ul>
      {houses.map(house => (
        <li key={house.id}>
          {house.name} - ${house.price}
          <button onClick={() => onDelete(house.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

const HouseForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <button type="submit">Add House</button>
    </form>
  );
};

const App = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    
    fetchHouses();
  }, []);

  const fetchHouses = () => {
    axios.get(MOCK_API_URL)
      .then(response => setHouses(response.data))
      .catch(error => console.error('Error fetching houses:', error));
  };

  const addHouse = ({ name, price }) => {
    axios.post(MOCK_API_URL, { name, price })
      .then(fetchHouses)
      .catch(error => console.error('Error adding house:', error));
  };

  const deleteHouse = (id) => {
    axios.delete(`${MOCK_API_URL}/${id}`)
      .then(fetchHouses)
      .catch(error => console.error('Error deleting house:', error));
  };

  return (
    <div>
      <HouseList houses={houses} onDelete={deleteHouse} />
      <HouseForm onSubmit={addHouse} />
    </div>
  );
};

export default App;
