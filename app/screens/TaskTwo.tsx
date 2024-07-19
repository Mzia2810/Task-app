import { increment, decrement } from "../store/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import { userStatus, userVisitData, fetchUserVisit } from "../store/visitSlice";
import {
  fetchGalleryImages,
  selectImages,
  selectGalleryStatus,
  selectGalleryError,
} from "../store/gallerySlice";

const TaskTwo = () => {
  const images = useSelector(selectImages);
  const status = useSelector(selectGalleryStatus);
  const error = useSelector(selectGalleryError);

  const [galleryImages, setGalleryImages] = useState();
  // const count = useSelector((state) => state.counter);
  const visitUser = useSelector(userVisitData);
  // const visitUserStatus = useSelector(userStatus)
  // console.log('visit user list : ',visitUser.patient)

  console.log("These are images from gallery I recieved : : ", images);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserVisit());
  }, []);
  useEffect(() => {
    setGalleryImages(images);
  }, [images]);

  const Item = ({item}) => {
    return (
      <>
        <View style={styles.item}>
          <View style={{flex:1, justifyContent: 'space-evenly', flexDirection:'row',alignItems:'center', }}>
            <Text style={styles.title}>Malik</Text>
            <Image
              source={{
                uri: item,
              }}
              style={styles.image}
            />
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => dispatch(fetchGalleryImages())}
        style={styles.btn}
      >
        <Text style={{ color: "white", textAlign: "center" }}>get Images </Text>
      </TouchableOpacity>

      <View style={styles.FlatlistContainer}>
        <FlatList
          data={galleryImages}
          renderItem={({ item }) => <Item item={item} />}
          // keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

export default TaskTwo;

const styles = StyleSheet.create({
  btn: {
    marginVertical: 5,
    padding: 10,
    width: 200,
    alignSelf: "center",
    alignContent: "center",
    borderRadius: 10,
    backgroundColor: "black",
    borderColor: "white",
  },
  image: {
    width: 200,
    height: 130,
    borderRadius:10,
    marginLeft:50,
  },
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
    marginBottom: hp("2%"),
    flex: 1,
  },
  buttons: {
    alignItems: "center",
    margin: wp("2%"),
    backgroundColor: "orange",
    paddingHorizontal: wp("10%"),
    paddingVertical: hp("1%"),
    borderRadius: 5,
  },
  SearchBar: {
    borderRadius: 5,
    borderColor: "orange",
    borderWidth: 2,
    height: hp("6%"),
    padding: 10,
    width: wp("90%"),
    fontSize: wp("5%"),
    marginBottom: hp("1%"),
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "orange",
    borderRadius: 5,
    paddingVertical: hp("2%"),
    paddingHorizontal: hp("1%"),
    marginHorizontal: wp("2.3%"),
    marginVertical: hp("1%"),
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    marginHorizontal: wp("1%"),
  },
  title: { fontSize: 14 },
});
