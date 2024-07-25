import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../store/EventSlice";

const EventList = ({ item, list, EditEvent }) => {

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteEvent({ id, list }));
  };

  return (
    <View key={item.id} style={styles.eventItem}>
      <View style={{ justifyContent: "center", flex: 1, flexGrow: 1 }}>
        <Text style={{ textAlign: "justify" }}>{item.eventName}</Text>
        <Text>{item.selectDate}</Text>
      </View>

      {list === "upComing" ? (
        <TouchableOpacity onPress={EditEvent} style={styles.gray}>
          <Text style={{ color: "white" }}>Edit</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.delete}
      >
        <Text style={{ color: "white" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventList;

const styles = StyleSheet.create({
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
  eventItem: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 1,
    borderBottomWidth: 0.3,
  },
});
