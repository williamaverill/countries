import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import React from "react";

class Flags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CountryData: {},
      CountryCodes: [],
    };
  }

  componentDidMount() {
    this.fetchAPIResponse();
  }

  fetchAPIResponse = async () => {
    try {
      let response = await fetch("https://flagcdn.com/en/codes.json");
      let jsonResponse = await response.json();
      this.setState({
        CountryData: jsonResponse,
        CountryCodes: Object.keys(jsonResponse),
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const flags = this.state.CountryCodes?.map((countryCode) => {
      return (
        <View style={styles.countryFlagItem}>
          <Image
            style={styles.countryFlag}
            source={{
              uri: "https://flagcdn.com/64x48/" + countryCode + ".png",
            }}
          />
          <Text style={styles.countryText}>
            {this.state.CountryData[countryCode]}
          </Text>
        </View>
      );
    });

    return (
      <ScrollView contentContainerStyle={styles.container}>{flags}</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
  },
  countryFlagItem: {
    width: 480,
    height: 48,
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderWidth: 2,
  },
  countryFlag: {
    width: 64,
    height: 48,
  },
  countryText: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default Flags;
