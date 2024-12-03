import ActionSheet from "react-native-action-sheet";

export default {
  showActionSheet(options: any = [], onPress = (id: number) => {}) {
    ActionSheet.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: options.length - 1,
        title: "Choose an option",
        cancelButtonTintColor: "red"
      },
      (id: number) => {
        onPress(id);
      }
    );
  },
};
