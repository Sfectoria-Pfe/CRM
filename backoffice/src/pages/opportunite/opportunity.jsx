import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOpportunites } from "../../store/opportunite";
import Sortable from "./component/Sortable";

export default function OpportuniteListe() {
  const dispatch = useDispatch();

  const opportunites = useSelector(
    (state) => state.opportunite.opportunites.items
  );
  const [opportuniteList, setOpportuniteList] = useState([
    {
      id: 1,
      title: "New",
      stage: [],
    },
    {
      id: 2,
      title: "Won",
      stage: [],
    },
  ]);

  useEffect(() => {
    dispatch(fetchOpportunites());
  }, [dispatch]);

  useEffect(() => {
    setOpportuniteList([
      { id: 0, title: "new", stage: [] },
      {
        id: 1,
        title: "won",
        stage: [...JSON.parse(JSON.stringify(opportunites))],
      },
    ]);
  }, [opportunites]);

  return (
    <div className="d-flex justify-content-between p-5">
      <Sortable
        id={opportuniteList[0].id}
        title={opportuniteList[0].title}
        stage={opportuniteList[0].stage}
        list={opportuniteList}
        setList={setOpportuniteList}
      />
      <Sortable
        id={opportuniteList[1].id}
        title={opportuniteList[1].title}
        stage={opportuniteList[1].stage}
        list={opportuniteList}
        setList={setOpportuniteList}
      />
    </div>
  );
}
