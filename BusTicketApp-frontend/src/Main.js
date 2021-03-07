import React, { useState, useMemo } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { parseDate } from "react-day-picker/moment";
import HeroPage from "./pages/HeroPage";
import JourneyPage from "./pages/JourneyPage";
import CustomerInfoPage from "./pages/CustomerInfoPage";
import AppContext from "./components/AppContext.js";
import ReviewPage from "./pages/ReviewPage";

export default function Main() {
  const today = new Date();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  const [adultPassenger, setAdultPassenger] = useState(
    query.get("adult-passenger") > 0 ? Number(query.get("adult-passenger")) : 1
  );
  const [childPassenger, setChildPassenger] = useState(
    query.get("child-passenger") > 0 ? Number(query.get("child-passenger")) : 0
  );
  const [youngPassenger, setYoungPassenger] = useState(
    query.get("young-passenger") > 0 ? Number(query.get("young-passenger")) : 0
  );
  const [elderyPassenger, setElderyPassenger] = useState(
    query.get("eldery-passenger") > 0
      ? Number(query.get("eldery-passenger"))
      : 0
  );

  const [ticketState, setTicketState] = useState([
    { label: "Adult", value: adultPassenger },
    { label: "Children", value: childPassenger },
    { label: "Young person", value: youngPassenger },
    { label: "Eldery person", value: elderyPassenger },
  ]);

  const [searchState, setSearchState] = useState({
    departDate: parseDate(query.get("departDate"))
      ? parseDate(query.get("departDate"))
      : today,
    origin: query.get("oCity") ? query.get("oCity") : "Tallinn",
    destination: query.get("dCity") ? query.get("dCity") : "Tartu",
    returnDate: parseDate(query.get("returnDate"))
      ? parseDate(query.get("returnDate"))
      : "",
  });

  const [passengers, setPassengers] = useState(
    adultPassenger + childPassenger + youngPassenger + elderyPassenger
  );

  const [selectedJourneys, setSelectedJourneys] = useState([]);

  const values = useMemo(
    () => ({
      query,
      passengers,
      setPassengers,
      adultPassenger,
      setAdultPassenger,
      childPassenger,
      setChildPassenger,
      youngPassenger,
      setYoungPassenger,
      elderyPassenger,
      setElderyPassenger,
      ticketState,
      setTicketState,
      searchState,
      setSearchState,
      selectedJourneys,
      setSelectedJourneys,
    }),
    [
      searchState,
      query,
      passengers,
      adultPassenger,
      childPassenger,
      youngPassenger,
      elderyPassenger,
      ticketState,
      selectedJourneys,
      setSelectedJourneys,
    ]
  );

  return (
    <Switch>
      <AppContext.Provider
        value={{
          values,
        }}
      >
        <Route exact path="/" component={HeroPage} />
        <Route path="/journeys" component={JourneyPage} />
        <Route path="/add-information" component={CustomerInfoPage} />
        <Route path="/review-and-confirm" component={ReviewPage} />
      </AppContext.Provider>
    </Switch>
  );
}
