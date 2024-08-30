import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KonuOzetiModal from './KonuOzet';
import "./Modal.css";

function Modal({ setOpenModal, winner, target }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => setOpenModal(false)}
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
              onClick={() => navigate("/")}
              id="homeBtn"
            >
              Ana Sayfa
            </button>
            <button
              onClick={() => {
                setOpenModal(false);
                navigate(`/sinif/lise/9/tarih/ünite1/konu1/registration`);
              }}
              id="newGameBtn"
            >
              Yeni Oyun
            </button>
            <div>
              <button onClick={openModal} id="summaryBtn">Konu Özeti</button>
              <KonuOzetiModal isOpen={modalOpen} onClose={closeModal} target={target} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
