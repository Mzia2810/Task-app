import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList, TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from "react";
import { SearchBar } from "react-native-screens";

const DATA = [
  {
    id: 1,
    title1: 'Platinum Item',
    title2: '1',
  },
  {
    id: 2,
    title1: 'Magnesium Item',
    title2: '2',
  },
  {
    id: 3,
    title1: 'Selenium Item',
    title2: '3',
  },
  {
    id: 4,
    title1: 'Platinum Item',
    title2: '4',
  },
  {
    id: 5,
    title1: 'Magnesium Item',
    title2: '5',
  },
  {
    id: 6,
    title1: 'Selenium Item',
    title2: '6',
  },
  {
    id: 7,
    title1: 'Platinum Item',
    title2: '7',
  },
  {
    id: 8,
    title1: 'Magnesium Item',
    title2: '8',
  },
  {
    id: 9,
    title1: 'Selenium Item',
    title2: '9',
  },
  {
    id: 10,
    title1: 'Platinum Item',
    title2: '10',
  },

  {
    id: 11,
    title1: 'Platinum Item',
    title2: '11',
  },
  {
    id: 12,
    title1: 'Magnesium Item',
    title2: '12',
  },
  {
    id: 13,
    title1: 'Selenium Item',
    title2: '13',
  },
  {
    id: 14,
    title1: 'Platinum Item',
    title2: '14',
  },
  {
    id: 15,
    title1: 'Magnesium Item',
    title2: '15',
  },
  {
    id: 16,
    title1: 'Selenium Item',
    title2: '16',
  },
  {
    id: 17,
    title1: 'Platinum Item',
    title2: '17',
  },
  {
    id: 18,
    title1: 'Magnesium Item',
    title2: '18',
  },
  {
    id: 19,
    title1: 'Selenium Item',
    title2: '19',
  },
  {
    id: 20,
    title1: 'Platinum Item',
    title2: '20',
  },
  {
    id: 21,
    title1: 'Magnesium Item',
    title2: '21',
  },
  {
    id: 22,
    title1: 'Selenium Item',
    title2: '22',
  },
];


const Item = ({ item, checked, setChecked }) => {


  return (
    <View key={item.item}  style={styles.item}>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={checked}
          onValueChange={setChecked}
          color={checked ? '#4630EB' : undefined}
        />
      </View>
      <View style={{ justifyContent: 'center', marginLeft: wp('2%') }}>

        <Text style={styles.title}>{item.value.patient_id}</Text>
        <Text style={styles.title}>{item.value.patient.Fname}</Text>
        <Text style={styles.title}>{item.value.patient.Lname}</Text>
   
      </View>
    </View>
  );

}

const TaskOne = () => {
  const [data, setData] = useState([])
  const [onLoading, setOnLoading] = useState(false)
  const [onRefresh, setOnRefresh] = useState(false)
  const [onPage, setOnPage] = useState(1)

  const [text, setText] = useState('')
  const [checked, setChecked] = useState(false);


  useEffect(() => {
    fetchData()
  }, [1000])


const dataArray = Object.keys(data).map(item => ({item,value:data[item]}))
// console.log("My patients name : ",dataArray)

  const fetchData = async (onRefresh = false) => {
    if (onLoading)
      return;
    setOnLoading(true);
    const newPage = onRefresh ? 1 : onPage;
    const postdata = { practice_id: '17' }
    try {
      const response = await fetch('https://api.maxremind.technology/api/v1/mxchvisit/visitlist', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5NjI3NDUwLCJpYXQiOjE3MTk1OTg2NTAsImp0aSI6ImQ5ZGJkY2RiNjE3NDQ4ODc5MzdlYWMwNmM4NDUyNjMzIiwidXNlcl9pZCI6MTYxfQ.FMtC3gdhHOlzjPZEo_3V_5M-sYJeqf4uHvGfZ1EXtoc'
        },
        body: JSON.stringify(postdata)
      })
      const newDataa = await response.json()
      const newData = newDataa.map(item => ({
        ...item,
        checked: false,
      }));
      setData(onRefresh ? newData : [...data, ...newData]);
      setOnPage(newPage + 1)
    } catch (error) {
      console.error('what is reason : ', error)
    }
  }


  const LoadMoreData = () => {
    fetchData()
  }


  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttons}>
          <Text>Draft items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text>Proceed Items</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.SearchBar}
          placeholder="Type here to translate!"
          onChangeText={newText => setText(newText)}
          defaultValue={text}
        />


      </View>
      <View style={styles.FlatlistContainer}>
        <FlatList
          data={dataArray}
          onEndReached={LoadMoreData}
          onEndReachedThreshold={0.5}
          // ListFooterComponent={LoadFooter}
          // onRefresh={handleOnRefresh}
          refreshing={onRefresh}
          renderItem={({ item }) => <Item checked={checked} setChecked={() => { setChecked(!checked) }} item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

export default TaskOne;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "space-between",
    marginHorizontal: wp("2%"),

  },
  FlatlistContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "space-between",
    marginHorizontal: wp("2%"),
    marginBottom: hp('2%'),
    flex: 1,
  },
  buttons: {
    alignItems: "center",
    margin: wp("2%"),
    backgroundColor: "orange",
    paddingHorizontal: wp("10%"),
    paddingVertical: hp('1%'),
    borderRadius: 5,
  },
  SearchBar: {
    borderRadius: 5,
    borderColor: 'orange',
    borderWidth: 2,
    height: hp('6%'),
    padding: 10,
    width: wp('90%'),
    fontSize: wp('5%'),
    marginBottom: hp('1%')

  },
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
});
