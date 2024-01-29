import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import the icon set

type SearchBarProps = {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (text: string) => void; 
  setClicked: (clicked: boolean) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const {clicked, searchPhrase, setSearchPhrase, setClicked} = props;

  return (
    <View style={styles.container}>
      <View
        style={
          styles.searchBar
        }
      >
        {/* search Icon */}
        <MaterialIcons
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        <MaterialIcons name="chevron-right" size={20} color="black" style={{ padding: 1 }} onPress={() => {
          setSearchPhrase("")
        }}/>
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

  },
  searchBar: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});