import { StyleSheet, Text, View } from "react-native";
import { increment, decrement } from "../store/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import React,{useEffect} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { userStatus, userVisitData,fetchUserVisit } from "../store/visitSlice";

const TaskTwo = () => {
  // const count = useSelector((state) => state.counter);
  const visitUser = useSelector(userVisitData)
  // const visitUserStatus = useSelector(userStatus)

  console.log('visit user list : ',visitUser.patient)
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(fetchUserVisit())
  }, [1000])
  

  return (
    <View>
      <TouchableOpacity style={{padding:10,backgroundColor:'pink'}} onPress={() => dispatch(increment())}>
        <Text>Increment value by 1 </Text>
      </TouchableOpacity>
      <View style={{padding:10,backgroundColor:'green'}}>
      <Text>{'count'}</Text>

      </View>
      <TouchableOpacity style={{padding:10,backgroundColor:'orange'}} onPress={() => dispatch(decrement())}>
        <Text>Decrement by 1</Text>
      </TouchableOpacity>
      <View>
        <Text>

        </Text>
      </View>
    </View>
  );
};

export default TaskTwo;

const styles = StyleSheet.create({});
