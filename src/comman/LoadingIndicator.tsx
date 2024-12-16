import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import {Modal} from 'react-native';
import Colors from '../constants/Colors';
import Flex1 from '../components/Layouts/Flex1';
// import { Colors } from '../../constants/';

interface params {
  onRef: any;
}

export default class LoadingIndicator extends React.Component<params> {
  state = {
    visible: false,
  };

  static dialogInstance: any;

  static show() {
    this.dialogInstance.showDialog();
  }

  static hide() {
    this.dialogInstance.hideDialog();
  }
  showDialog(config: any) {
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
      <>
        <Modal
          transparent
          visible={this.state.visible}
          // visible={true}
        >
          <Flex1
            style={{
              backgroundColor: '#00000028',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.styleDialogContent}>
              <View style={styles.activityIndicatorWrapper}>
                <BallIndicator color={Colors.blue} size={34} />
              </View>
            </View>
          </Flex1>
        </Modal>
        {/* <Dialog
          dialogStyle={styles.styleDialogContent}
          footer={null}
          visible={this.state.visible}>
          <View style={styles.activityIndicatorWrapper}>
            <BallIndicator color={COLORS.secondary} size={34} />
          </View>
        </Dialog> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  styleDialogContent: {
    padding: 10,
    backgroundColor: Colors.white,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
