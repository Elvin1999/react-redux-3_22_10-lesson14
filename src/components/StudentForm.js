import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent, updateStudent } from "../features/studentSlice";

export default function StudentForm({ currentStudent, setCurrentStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    score: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentStudent) {
      setFormData(currentStudent);
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      dispatch(updateStudent({ id: formData.id, student: formData }));
    } else {
      dispatch(addStudent(formData));
    }
    setFormData({
      name: "",
      surname: "",
      age: "",
      score: "",
    });
    setCurrentStudent(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="surname"
        value={formData.surname}
        onChange={handleChange}
        placeholder="Surname"
      />
      <input
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input
        name="score"
        value={formData.score}
        onChange={handleChange}
        placeholder="Score"
      />
      <button type="submit">{formData.id ? "Update" : "Add"} Student</button>
    </form>
  );
}
