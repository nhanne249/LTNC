import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllClassesThunk } from "../../../redux/action/student";
import ".";

const Schedule = () => {
  const dispatch = useDispatch();

  const [dataReceived, setDataReceived] = useState();
  const [isReceived, setIsReceived] = useState(false);

  useEffect(() => {
    dispatch(getAllClassesThunk()).then((res) => {
      console.log(res);
      setIsReceived(true);
    });
  }, [isReceived]);

  return <div></div>;
};

export default Schedule;
