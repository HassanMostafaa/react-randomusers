import React, { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";
import { motion } from "framer-motion";
import ReactLoading from "react-loading";
import { AiOutlineClose } from "react-icons/ai";
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reqNum, setReqNum] = useState(4);
  const [selectedCard, setSelectedCard] = useState([]);
  const [modal, setModal] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const selectCardFunc = (pic, firstName, lastName, email, address) => {
    setModal(true);
    setOverlay(true);
    setSelectedCard([
      { pic },
      { firstName },
      { lastName },
      { email },
      { address },
    ]);
  };

  useEffect(() => {
    axios.get(`https://randomuser.me/api/?results=${reqNum}`).then((res) => {
      setUsers(res.data.results);
      setLoading(false);
    });
  }, [reqNum]);

  return (
    <div className="App">
      {overlay && <div className="overlay"></div>}
      {modal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          className="modal"
        >
          {selectedCard && (
            <div>
              <div
                style={{ float: "right", fontSize: "20px" }}
                className="close"
                onClick={() => {
                  setOverlay(false);
                  setModal(false);
                  setSelectedCard([]);
                }}
              >
                <AiOutlineClose> </AiOutlineClose>
              </div>
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: [0, 0, 1] }}
              >
                <img src={selectedCard[0].pic} alt="" />
              </motion.div>
              <div>First Name : {selectedCard[1].firstName}</div>
              <div>last Name : {selectedCard[2].lastName}</div>
              <div>E-mail : {selectedCard[3].email}</div>
              <div>Address : {selectedCard[4].address}</div>
            </div>
          )}
        </motion.div>
      )}
      <header className="App-header">
        <br />
        <h3>Enter the Number of Users You want to see</h3>
        <br />
        <input
          placeholder={"Requests Number ...."}
          type="number"
          onChange={(e) => setReqNum(e.target.value)}
          min="1"
        />
        <br />
        {reqNum > 1 ? (
          <h3>List Of {reqNum} Random Users</h3>
        ) : (
          <h3>One Random User</h3>
        )}
        <div className="users">
          {!loading ? (
            users.map((user, ix) => (
              <motion.div
                onClick={() => {
                  selectCardFunc(
                    user.picture.large,
                    user.name.first,
                    user.name.last,

                    user.email,
                    user.location.city
                  );
                }}
                initial={{ opacity: 1 }}
                animate={{ opacity: [0, 0, 1] }}
                transition={{ duration: 0.5, delay: ix / 10 }}
                layout
                // drag
                // dragConstraints
                dragMomentum={false}
                className="user-card"
                key={ix}
              >
                <div className="user-pic">
                  <img
                    draggable="false"
                    src={user.picture.medium}
                    alt="user-pic"
                  />
                </div>
                <p className="first-name">
                  {user.name.first} {user.name.last}
                </p>
                <h6 className="email"> {user.email}</h6>
                <p style={{ fontSize: "14px" }}>{user.location.country},</p>
                <p> {user.location.city} </p>
                <p> {user.phone}</p>
              </motion.div>
            ))
          ) : (
            <div style={{ textAlign: "center" }}>
              <ReactLoading type={"spinningBubbles"} color="#fff" />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
