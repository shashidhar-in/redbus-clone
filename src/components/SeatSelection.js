import React, { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/seat.css";



// DRY

const SeatSelection = () => {
  const [selectedSeat, setSelectedSeat] = useState([]);

  const [modalShow, setModalShow] = React.useState(false);
  const navigate=useNavigate();

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        centered
        backdrop="static"
      >
 
        <Modal.Body className="d-flex justify-content-center align-items-center flex-column" >
          <div class="wrapper"> <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
          </div>
          <h6 class="success">Oh Yeah Sucess!</h6>
          <p>Thankyou for booking tickets with Redbus</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={()=>{navigate("/")}}>Return To Home</Button>
          <Button variant="danger" onClick={props.onHide}>Continue</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function seatNum(i, j) {
    return 8 * i + j + 1;
  }

  return (
    <Container className="bg-danger m-0 mw-100 p-4 d-flex justify-content-center align-items-center">
      <div className="seats bg-white p-2  flex-column">
        {[1, 2, 3].map((seatRow, i) => {
          return (
            <div className={`row mt-${Math.ceil(seatRow * 1.5)}`} key={seatRow}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((seat, j) => {
                return (
                  <div
                    className={`seat ${selectedSeat.includes(seatNum(i, j)) ? "bg-success" : ""
                      }`}
                    key={seatNum(i, j)}
                    onClick={() => {
                      const previousSeats = [...selectedSeat];
                      if (selectedSeat.includes(seatNum(i, j))) {
                        const allSeatsExceptCurrent = previousSeats.filter(
                          (currentSeat) => {
                            return currentSeat !== seatNum(i, j);
                          }
                        );
                        setSelectedSeat(allSeatsExceptCurrent);
                      } else {
                        console.log("Here", seatNum(i, j))
                        setSelectedSeat([...previousSeats, seatNum(i, j)]);
                      }
                    }}
                  ></div>
                );
              })}
            </div>
          );
        })}
        {selectedSeat.length ? <Button variant="success rounded-0 mt-4" onClick={() => { setModalShow(true) }}>
          Book Tickets
        </Button> : null}
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </Container>
  );
};

export default SeatSelection;