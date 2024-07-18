import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TaskOne from '../screens/TaskOne';
import TaskTwo from '../screens/TaskTwo';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TaskOne" options={{ title: 'Infinite Scroll List' }}  component={TaskOne} />
      <Drawer.Screen name="TaskTwo" component={TaskTwo} />
    </Drawer.Navigator>
  )
}

export default DrawerScreen

const styles = StyleSheet.create({})