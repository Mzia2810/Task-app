import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImagesInRedux, updateImageResize } from "../store/ImagesSlice";
import Item from "./component/Item";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const ImageHandler = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.images);
  

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Premission to access the media library is required ");
      } else {
        console.log("Premission Granted ! ");
      }

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
        first: 10,
      });

      dispatch(addImagesInRedux(media.assets));
    })();
  }, []);

  const resizeImage = async ({item,Size}) => {
    try {
      const [width, height] = Size.split('x').map(Number);
      const manipuleImage = await ImageManipulator.manipulateAsync(
        item.item.uri,
        [{ resize: { width: width, height: height } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      const updateImageSize = { ...item, uri: manipuleImage.uri };
      dispatch(updateImageResize(updateImageSize));
    } catch (error) {
      console.error('Error resizing image:', error);
    }
   

  };


  const openModal = (image) => {
    setSelectedImage(image);
    console.log('modal Image :  ',image)
    setModalVisible(true);
  };

  const renderItem = (item) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            openModal(item.item.uri);
          }}
          style={{ borderWidth: 1, borderRadius: 2 }}
        >
          <Image source={{ uri: item.item.uri }} style={styles.image} />
        </TouchableOpacity>

        {selectedImage && (
          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              onPress={
                () => setModalVisible(false)}
              style={styles.modalContainer}
            >
              <Image
                source={{ uri: selectedImage }}
                style={[styles.modalImage, { width: 500 }]}
              />
              <View
                style={[
                  styles.closeButton,
                  { alignContent: "center", padding: 10, width: "auto" },
                ]}
              >
                <TouchableOpacity   onPress={() => {
                    setModalVisible(false)
                    // resizeImage({item,Size:'400x300'})
                  }}
                    style={{ marginVertical: 10 }}>
                  <Text style={styles.blue}>Low (400x300) </Text>
                </TouchableOpacity>
                <TouchableOpacity   onPress={() => {
                    setModalVisible(false)
                    resizeImage({item,Size:'800x700'})}}>
                  <Text style={styles.blue}>Medium (800x600) </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false)
                    resizeImage({item,Size:'1600x1200'})}}
                  style={{ marginVertical: 10 }}
                >
                  <Text style={styles.blue}>High (1600x1200) </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
};

export default ImageHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalImage: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
  },
  blue: { color: "blue" },
});
