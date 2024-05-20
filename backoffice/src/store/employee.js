import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fonctions asynchrones pour les opérations CRUD sur les employés
export const fetchEmployees = createAsyncThunk("employee/fetchEmployees", async () => {
  const response = await axios.get("http://localhost:7000/employees");
  return response.data;
});

export const fetchEmployee = createAsyncThunk("employee/fetchEmployee", async (id) => {
  const response = await axios.get(`http://localhost:7000/employees/${id}`);
  return response.data;
});

export const fetchemployeesWithoutAccount = createAsyncThunk(
  "client/fetchEmployeesWithoutAccount",
  async () => {

    const response = await axios.get("http://localhost:7000/employees/without-account", );
    return response.data;
  }
);

export const createEmployee = createAsyncThunk("employee/createEmployee", async (body) => {
  const response = await axios.post("http://localhost:7000/employees", body);
  return response.data;
});

export const updateEmployee = createAsyncThunk("employee/updateEmployee", async ({ id, body }) => {
  try {
    const response = await axios.patch(`http://localhost:7000/employees/${id}`, body);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'employé sur le backend :', error);
    throw error;
  }
});

export const deleteEmployee = createAsyncThunk("employee/deleteEmployee", async (id) => {
  await axios.delete(`http://localhost:7000/employees/${id}`);
  return id;
});

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: null,
    employees: {
      items: [], // Assurez-vous que items est initialisé comme un tableau vide
      count: 0,
    },
  },
   reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employees.items = action.payload;
      state.employees.count = action.payload.length;
    });
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.employee = action.payload;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.employee = action.payload;
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      const updatedEmployee = action.payload;
      const index = state.employees.items.findIndex(employee => employee.id === updatedEmployee.id);
      if (index !== -1) {
        state.employees.items[index] = updatedEmployee;
        state.employee = updatedEmployee;
      }
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.employees.items = state.employees.items.filter(employee => employee.id !== action.payload);
      state.employees.count--;
    });
  
  
  builder.addCase(fetchemployeesWithoutAccount.fulfilled, (state, action) => {
    state.employees.items = action.payload;
    state.employees.count = action.payload.length;
  });

},
});

export default employeeSlice.reducer;
