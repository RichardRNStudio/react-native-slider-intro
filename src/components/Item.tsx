import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Dimensions,
} from "react-native";
import { IData } from "../interfaces/IData.interface";

const Item = ({
  key,
  backgroundColor,
  title,
  text,
  link,
  activeLanguage,
  image,
}: IData) => {
  const language = activeLanguage || "en";
  return (
    <View key={key} style={[styles.slide, { backgroundColor }]}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {Array.isArray(title) ? title[language] : title}
        </Text>
        <Image style={styles.image} source={image} />
        <View>
          <Text style={styles.text}>
            {Array.isArray(text) ? text[language] : text}
          </Text>
          {link && (
            <TouchableOpacity onPress={() => Linking.openURL(link)}>
              <Text style={styles.link}>{link}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    maxHeight: Dimensions.get("window").height * 0.85,
  },
  slide: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  text: {
    marginLeft: 20,
    marginRight: 20,
    lineHeight: 24,
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
  image: {
    maxWidth: Dimensions.get("window").width,
    maxHeight: Dimensions.get("window").width,
  },
  link: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
    color: "#2f39ff",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
