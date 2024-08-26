import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Dialog, ScaleAnimation } from 'react-native-popup-dialog';
import Images from '../../constants/Images';
import { SQUARE, WIDTH } from '../../constants/Utils';
import LottieView from 'lottie-react-native';
import Colors from '../../constants/Colors';

export default class ProgressDialog extends Component {
  state = {
    visible: false,
  };

  static dialogInstance;
  static show(config) {
    this.dialogInstance.showDialog(config);
  }

  static hide() {
    this.dialogInstance.hideDialog();
  }
  showDialog(config) {
    this.setState({
      visible: true,
    });
  }
  hideDialog = () => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
  }

  render() {
    return (
      <Dialog
        dialogStyle={styles.styleDialogContent}
        footer={null}
        visible={this.state.visible}>
        <View style={{
        }}>
          <LottieView
            source={Images.Loader

            }
            autoPlay
            loop
            resizeMode='contain'
            style={{
              width: 140,
              height: 140,
              alignSelf: 'center',
            }}
          />
        </View>

      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  styleDialogContent: {
    width: 60,
    borderRadius: 60,
    height: 60,
    justifyContent: 'center',
    backgroundColor: Colors.LightGreen,
    alignItems: 'center',
  },
  activityIndicatorWrapper: {},
});
