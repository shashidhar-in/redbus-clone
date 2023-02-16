import React, { useContext, useEffect, useState } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import JourneyContext from "../context/JourneyContext";
import BusResult from "./BusResult";
import nobus from "../Nobuses.png";

const SearchResults = () => {
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { from, to } = useContext(JourneyContext);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchBuses() {
    setIsLoading(true);
    const response = await fetch(
      `https://content.newtonschool.co/v1/pr/63b70222af4f30335b4b3b9a/buses?source=${from}&destination=${to}`
    );
    const allBuses = await response.json();
    setIsLoading(false);
    setBuses(allBuses);
  }

  useEffect(() => {
    fetchBuses();
  }, [from, to]);

  function sortResults(criteria) {
    if (criteria === "Price") {
      const busesCopy = [...buses]
      const sortedBuses = busesCopy.sort((a, b) => {
        if (a.ticketPrice < b.ticketPrice) {
          return -1
        }

        return 1

      })
      setBuses(sortedBuses)
    }
  }

  if (isLoading) {
    return <Spinner animation="border" variant="danger" />;
  }

  if (buses.length != 0) {
    return (
      <div className="bg-danger p-2 d-flex flex-column">
        <div className="bg-white p-2 d-flex w-75 align-self-center">
          <h4 className="w-50">SORT BY:</h4>
          <div className="d-flex justify-content-around w-100">
            {["Departure", "Arrival", "Price"].map((criteria, i) => {
              return (
                <Button variant="danger" className="rounded-0" key={i} onClick={() => {
                  sortResults(criteria)
                }}>
                  {criteria}
                </Button>
              );
            })}
          </div>
        </div>
        {buses.map((bus, i) => {
          return <BusResult bus={bus} key={i} />;
        })}
      </div>
    )
  } else {
    return <Image src={nobus}/>
  }

};

export default SearchResults;