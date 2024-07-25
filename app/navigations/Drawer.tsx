import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TaskOne from '../screens/TaskOne';
import TaskTwo from '../screens/TaskTwo';
import ImageHandler from '../screens/ImageHandler';
import EventHandler from '../screens/EventHandler';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="EventHandler" options={{ title: 'Event Manager' }}  component={EventHandler} />

      {/* <Drawer.Screen name="TaskOne" options={{ title: 'Infinite Scroll List' }}  component={TaskOne} /> */}
      <Drawer.Screen name="TaskTwo" options={{ title: 'Image Picker' }} component={TaskTwo} />
      <Drawer.Screen name="ImageHandler" options={{ title: 'Image gallery' }}  component={ImageHandler} />
    </Drawer.Navigator>
  )
}

export default DrawerScreen

const styles = StyleSheet.create({})