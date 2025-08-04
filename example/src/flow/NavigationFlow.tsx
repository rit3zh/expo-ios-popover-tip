import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation";
import { Home } from "../screens/Home";
import { Search } from "../screens/Search";
import { Library } from "../screens/Library";

const Tab = createNativeBottomTabNavigator();
export default function NavigationFlow() {
  return (
    <NavigationContainer>
      <Tab.Navigator translucent>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => ({ sfSymbol: "house.fill" }),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: () => ({ sfSymbol: "magnifyingglass" }),
          }}
        />
        <Tab.Screen
          name="Library"
          component={Library}
          options={{
            tabBarIcon: () => ({ sfSymbol: "book.pages.fill" }),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
