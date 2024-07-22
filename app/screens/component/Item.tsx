import { StyleSheet, Text, View } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React,{useState,useEffect} from 'react'
import Checkbox from 'expo-checkbox';


const Item = ({ item}) => {
  const [checked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedArray, setCheckedArray] = useState([]);


// console.log(' checked array  :  : ',checkedArray )
  const handleCheckboxChange = (item) =>{

    const newCheckedState = !checkedItems[item.id]
    setCheckedItems(prevState => ({
      ...prevState,
      [item.id] : newCheckedState
    }))
    if(newCheckedState) {
      setCheckedArray(preItem => [...preItem,item])
      // console.log('checked array after adding item : ',checkedArray)
    }else {
      setCheckedArray(preItem => preItem.filter(pre => pre.id !== item.id));
      // console.log("check array after removing item : ",checkedArray)
    }
  }

  return (
    <View key={item.item}  style={styles.item}>
      <View style={styles.section}>
        <Checkbox
        key={item.item}
          style={styles.checkbox}
          value={checkedItems[item.id] || false}
          onValueChange={() => {
            handleCheckboxChange(item)}}
          color={checkedItems ? '#4630EB' : undefined}
        />
      </View>
      <View style={{ justifyContent: 'center', marginLeft: wp('2%') }}>

        <Text style={styles.title}>{item?.value?.patient_id}</Text>
        <Text style={styles.title}>{item?.value?.patient.Fname}</Text>
        <Text style={styles.title}>{item?.value.patient.Lname}</Text>
   
      </View>
    </View>
  );

}
export default Item

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'orange',
    borderRadius: 5,
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('1%'),
    marginHorizontal: wp("2.3%"),
    marginVertical: hp("1%"),
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    marginHorizontal: wp('1%')
  },
  title: { fontSize: 14 }
})