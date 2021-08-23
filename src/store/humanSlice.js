import { taskSlice } from './taskSlice';

const { nanoid, createSlice } = require('@reduxjs/toolkit');
const createHuman = (name) => ({
  id: nanoid(),
  taskIds: [],
  name
});

const initialState = [
  createHuman('Steve'),
  createHuman('Marc'),
  createHuman('Tanner'),
  createHuman('Aisha')
];

export const humanSlice = createSlice({
  name: 'human',
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(createHuman(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(taskSlice.actions.assignToUser, (state, action) => {
      for (const human of state) {
        if (human.id === action.payload.humanId) {
          human.taskIds.push(action.payload.taskId);
        } else {
          human.taskIds = human.taskIds.filter(
            (id) => id !== action.payload.taskId
          );
        }
      }
    });
  }
});
