import { createSlice } from "@reduxjs/toolkit";


const ImageGallerySlice  = createSlice({
    name:'images',
    initialState:{
        images:[],
    },
    reducers:{
        addImagesInRedux:(state,action) =>{
            // console.log('State is of Images : ',state)
            state.images = action.payload;
        },
        updateImageResize:(state,action) =>{
            const {id,width,height,uri} = action.payload.item;
            console.log("width in Redux : ",width)
            console.log("height in Redux : ",height)
            console.log("uri in Redux : ",uri)
            const index = state.images.findIndex(img => img.id === id) 
            if(index !== -1){
                state.images[index] = {
                    ...state.images[index],
                    width:width,
                    height:height,
                    uri:uri
                }
                console.log('updated')
            }

        }
    }

})

export const {addImagesInRedux,updateImageResize} = ImageGallerySlice.actions;
export default ImageGallerySlice.reducer;