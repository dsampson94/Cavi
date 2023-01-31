import React, { useState } from 'react';

function SearchModal() {
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    localStorage.setItem('search', searchValue);
    setSearchValue('');
    setShowModal(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={() => setShowModal(!showModal)}>
        {showModal ? 'Close' : 'Open'} Modal
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Search saved to local storage: {searchValue}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchModal;
