import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../features/studentSlice";

export default function StudentList({ setCurrentStudent }) {
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          {student.name} {student.surname} (Age : {student.age},Score :{" "}
          {student.score})
          <button onClick={() => setCurrentStudent(student)}>Edit</button>
          <button onClick={() => handleDelete(student.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
