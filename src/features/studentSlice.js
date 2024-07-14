import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:27001",
});

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await api.get("/students");
    return response.data;
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student) => {
    const response = await api.post("/students", student);
    return response.data;
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, student }) => {
    const response = await api.put(`/students/${id}`, student);
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudents",
  async (id) => {
    var response=await api.delete(`/students/${id}`);
    return response.data;
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student.id === action.payload.id
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student.id !== action.payload.id
        );
      });
  },
});

export default studentSlice.reducer;
