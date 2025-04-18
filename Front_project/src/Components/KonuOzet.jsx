import React, { useState, useEffect } from "react";
import "./Modal.css";
import ozetData from '../data/ozet.json';

function KonuOzetiModal({ isOpen, onClose, target }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (isOpen) {
      console.log("Target:", target);
      console.log("Ozet Data:", ozetData);

      const matchingItem = ozetData.find(
        (item) => item.name.toUpperCase() === target.toUpperCase()
      );
      console.log("Matching Item:", matchingItem);
      setSummary(matchingItem);
    }
  }, [isOpen, target]);

  if (!isOpen) return null;

  return (
    <div className="konuOzetiBackground">
      <div className="konuOzetiContainer">
        <div className="konuOzetiCloseBtn">
          <button className="closer" onClick={onClose}>X</button>
        </div>
        <div className="konuOzetiTitle">
          <h1>{target.toUpperCase()}</h1>
        </div>
        <div className="konuOzetiBody">
          {summary ? (
            <>
              <p>{summary.definition}</p>
            </>
          ) : (
            <p>Özet bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default KonuOzetiModal;
