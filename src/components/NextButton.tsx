import React from "react";
import { Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { INextButton } from "../interfaces/INextButton.interface";

const NextButton = ({ nextLabel }: INextButton) => {
  return (
    <>
      <Text style={styles.nextText}>{nextLabel}</Text>
      <Icon name="chevron-right" size={14} style={styles.nextIcon} />
    </>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  nextText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    fontSize: 14,
  },
  nextIcon: {
    color: "white",
  },
});
