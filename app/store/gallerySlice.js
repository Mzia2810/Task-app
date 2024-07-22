import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as GalleryImagePicker from "expo-image-picker";
// Image picker
export const fetchGalleryImages = createAsyncThunk(
  "gallery/fetchImages",
  async (_, thunkAPI) => {
    const imageResult = GalleryImagePicker.launchImageLibraryAsync({
      mediaTypes: GalleryImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });
    if (!(await imageResult).canceled) {
      return (await imageResult).assets.map((asset) => asset.uri);
    } else {
      throw new Error("image selection is cancelled : ");
    }
  }
);




const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    images: [],
    imageData:[],
    status: "idle",
    error: null,
  },
  reducer: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchGalleryImages.pending,(state) =>{
        state.state = 'loading'
    })
    .addCase(fetchGalleryImages.fulfilled,(state,action) =>{
        state.status = 'fulfilled';
        state.imageData = action.payload;
    })
    .addCase(fetchGalleryImages.rejected,(state,action) =>{
        state.status = 'failed';
        state.error = action.error.message
    })
  },
});

export default gallerySlice.reducer
export const selectImages = state => state.gallery.imageData;
export const selectGalleryStatus = state => state.gallery.status
export const selectGalleryError = state => state.gallery.error