import React from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

function Modal({ setOpenModal, winner }) {
  const navigate = useNavigate(); // useNavigate hook'unu tanımladık

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
        <div className="kapsam">
        <div className="body">
          <p>Kazanan: {winner}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              navigate("/"); // Ana sayfaya yönlendirme
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
    </div>
  );
}

export default Modal;
