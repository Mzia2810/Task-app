import { createSlice } from "@reduxjs/toolkit";

const EventSlice = createSlice({
  name: "event",
  initialState: {
    upComingEvents: [],
    prevEvents: [],
  },
  reducers: {
    addEventInStore: (state, action) => {
      const event = action.payload;
      const eventDate = new Date(event.selectDate);
      const currentDate = new Date();
      if (eventDate < currentDate) {
        state.prevEvents = [...state.prevEvents, event];
      } else {
        state.upComingEvents = [...state.upComingEvents, event];
      }
    },
    deleteEvent: (state, action) => {
      const { id, list } = action.payload;
      if (list === "upComing") {
        state.upComingEvents = state.upComingEvents.filter(
          (event) => event.id !== id
        );
        console.log("upcoming event is deleted :  ");
      } else if (list === "previous") {
        state.prevEvents = state.prevEvents.filter((event) => event.id !== id);
        console.log("Previous event is deleted :  ");
      }
    },
    editEventInStore: (state,action) =>{
      const {id,eventName , selectDate} = action.payload;
      console.log(id,eventName,selectDate)
      const eventIndex  = state.upComingEvents.findIndex(event => event.id === id)
      if(eventIndex >= 0){
        state.upComingEvents[eventIndex] ={id,eventName,selectDate}
      }

    }
  },
});

export const { addEventInStore, deleteEvent,editEventInStore } = EventSlice.actions;
export default EventSlice.reducer;
