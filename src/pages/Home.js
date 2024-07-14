import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/studentSlice";
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";

export default function Home() {
  const [currentStudent, setCurrentStudent] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.students.loading);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <>
      <h1>Students Management App</h1>
      <StudentForm
        currentStudent={currentStudent}
        setCurrentStudent={setCurrentStudent}
      ></StudentForm>
      {loading ? <p>Loading . . . </p> : <StudentList   setCurrentStudent={setCurrentStudent}></StudentList>}
    </>
  );
}
