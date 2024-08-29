import React from "react";
import "./Modal.css";

function Modal({ setOpenModal, winner }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Oyun Bitti</h1>
        </div>
        <div className="body">
          <p>Kazanan: {winner}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="homeBtn"
          >
            Ana Sayfa
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
              // Burada yeni oyun başlatma işlevini ekleyebilirsiniz
            }}
            id="newGameBtn"
          >
            Yeni Oyun
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
              // Burada konu özeti sayfasına yönlendirme işlevini ekleyebilirsiniz
            }}
            id="summaryBtn"
          >
            Konu Özeti
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
