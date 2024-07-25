import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import EventList from "./component/EventList";
import { useDispatch, useSelector } from "react-redux";
import { addEventInStore, editEventInStore } from "../store/EventSlice";

const EventHandler = () => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [selectedEventEdit, setSelectedEventEdit] = useState(null);

  const upComingEvents = useSelector((state) => state.event.upComingEvents);
  const prevEvents = useSelector((state) => state.event.prevEvents);

  const dispatch = useDispatch();
  const handleSetdate = (date) => {
    setSelectDate(date);
    setIsDatePickerVisible(false);
  };

  const handleAddEvent = (date) => {
    if (eventName !== "" && selectDate !== "") {
      if (new Date(date) <= new Date()) {
        console.log("please select future date ");
      }
      const event = {
        id: new Date().toString(),
        eventName: eventName,
        selectDate: selectDate.toString(),
      };
      dispatch(addEventInStore(event));
      setEventName("");
      setSelectDate("");
    }
  };

  const handleSaveEvent = () => {
    if (eventName !== "" && selectDate !== "") {
      if (new Date(selectDate) <= new Date()) {
        console.log("select future date ");
      }

      if (selectedEventEdit) {
        dispatch(
          editEventInStore({
            id: selectedEventEdit.id,
            eventName: eventName,
            selectDate: selectDate.toString(),
          })
        );
        setSelectedEventEdit(null);
        setEventName("");
        setSelectDate("");
      } else {
        const event = {
          id: new Date().toString(),
          eventName: eventName,
          selectDate: selectDate,
        };
        dispatch(addEventInStore(event));
      }
    }
  };

  return (
    <>
      <View style={{ width: "auto", backgroundColor: "white" }}>
        <Text style={styles.titleEvent}>Event Manager</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Upcoming Events</Text>
        <FlatList
          data={upComingEvents}
          renderItem={({ item }) => (
            <EventList
              list={"upComing"}
              EditEvent={() => {
                setEventName(item.eventName);
                setSelectedEventEdit(item);
                setSelectDate(new Date(item.selectDate));
              }}
              item={item}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />

        <Text style={styles.title}>Previous Events</Text>
        <FlatList
          data={prevEvents}
          renderItem={({ item }) => <EventList list={"previous"} item={item} />}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />

        <View style={styles.form}>
          <TextInput
            style={styles.eventInput}
            value={eventName}
            placeholder="event name "
            onChangeText={(val) => setEventName(val)}
          />
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setIsDatePickerVisible(true)}
          >
            <Text>
              {selectDate ? selectDate.toLocaleString() : "select date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleSetdate}
            onCancel={() => setIsDatePickerVisible(false)}
          />
        </View>
        <TouchableOpacity
          onPress={selectedEventEdit ? handleSaveEvent : handleAddEvent}
          style={styles.eventBtn}
        >
          <Text style={{ color: "white" }}>
            {selectedEventEdit ? "Save Event" : "Add Event"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EventHandler;

const styles = StyleSheet.create({
  save: {
    backgroundColor: "#b22222",
    padding: 6,
    borderRadius: 7,
    margin: 5,
  },
  delete: {
    backgroundColor: "#b22222",
    padding: 6,
    borderRadius: 7,
    margin: 5,
  },
  gray: {
    backgroundColor: "#778899",
    padding: 6,
    borderRadius: 7,
    margin: 5,
  },
  datePicker: {
    alignItems: "center",
    padding: 13,
    // backgroundColor: "black",
    borderRadius: 10,
    borderWidth: 1,
  },
  titleEvent: {
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "700",
    color: "red",
  },
  eventBtn: {
    borderRadius: 5,
    backgroundColor: "black",
    padding: 10,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  list: {
    marginBottom: 20,
  },
  eventItem: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 1,
    borderBottomWidth: 0.3,
  },
  form: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  eventText: {
    fontSize: 16,
  },
  eventInput: {
    flex: 1,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    // borderBottomColor: "#ccc",
    fontSize: 16,
  },
});
