import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useGameContext } from "@/GameContext";

const Block = ({ index }: { index: number }) => {
  const { blocks } = useGameContext();
  const [value, setValue] = useState(blocks?.value[index].val || 0);

  useAnimatedReaction(
    () => blocks?.value[index]?.val,
    (val) => {
      if (val !== undefined) {
        runOnJS(setValue)(val);
      }
    }
  );

  const styles = useAnimatedStyle(() => {
    const block = blocks!.value[index];
    if (!block || block.val <= 0) {
      return {
        display: "none",
      };
    }

    const { x, y, w, val } = block;

    return {
      display: "flex",
      width: w,
      height: w,
      position: "absolute",
      top: withTiming(y),
      left: x,
      backgroundColor: "#f5b52f",
      alignItems: "center",
      justifyContent: "center",
    };
  });

  return (
    <Animated.View style={styles}>
      <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
        {value}
      </Text>
    </Animated.View>
  );
};

export default Block;

const styles = StyleSheet.create({});
