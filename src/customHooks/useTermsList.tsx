import React, { useState, useEffect } from "react";
import mockedTermsList from "../static/mockedTermsList";

const makeFetchRequest: any = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        // mock terms list
        resolve(mockedTermsList),
      500
    )
  );

export default () => {
  const [termsList, setTermsList] = useState([]);
  const shouldFetch = !termsList.length;

  useEffect(() => {
    const fetchTermsList = async () => {
      const response = await makeFetchRequest();
      setTermsList(response);
    };

    if (shouldFetch) fetchTermsList();
  }, []);

  return termsList;
};
