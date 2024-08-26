import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import Images from '../../constants/Images'
import { medium, regular } from '../CustomFont/MyFont'
import AuthButton from '../Button/AuthButton'
type Props = {
 visible: boolean,
 setVisible: Dispatch<SetStateAction<boolean>>,

}
const WaiverModal = ({ visible, setVisible, }: Props) => {
 return (
  <Modal visible={visible} onRequestClose={() => setVisible(false)} transparent animationType='fade'>
   <View style={{
    flex: 1,
    backgroundColor: '#000000db',
    alignItems: 'center',
    justifyContent: 'center'
   }}>
    <View style={{
     paddingHorizontal: 15,
     // height: 668,
     paddingBottom: 10,
     width: '90%',
     borderRadius: 10,
     backgroundColor: '#fff'
    }}>
     <Text style={[medium(20), {
      alignSelf: 'center',
      marginTop: 20
     }]}>
      Waiver
     </Text>
     <Text style={[regular(15), {
      lineHeight: 20,
      padding: 10,
     }]}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus
      mauris sed elit hendrerit, tincidunt pharetra nisl malesuada.
      Pellentesque eget porttitor purus. Praesent placerat sit amet augue eget
      pharetra. Aenean ac iaculis lectus. Integer quis tellus massa.
      Suspendisse aliquam mattis magna. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Sed eu augue et leo vulputate auctor.

      Aenean tincidunt aliquet eleifend. Aliquam ac rhoncus quam. Vivamus
      ornare dui in porttitor venenatis. Pellentesque habitant morbi tristique
      senectus et netus et malesuada fames ac turpis egestas. Praesent
      convallis semper nunc eget viverra. Nunc ultricies, ex id interdum
      commodo, nisl metus laoreet nisi, a faucibus erat orci a mi. Donec
      posuere aliquet turpis, a posuere quam. Morbi et diam consequat,
      vehicula arcu id, pulvinar tellus. Phasellus ut mauris est. Ut velit
      purus, consequat id suscipit ac, tempor eu diam. Nunc sit amet tellus


     </Text>

     <View style={{
      width: '50%',
      marginTop: 10,
      alignSelf: 'center'
     }}>
      <AuthButton title='Agree' onPress={() => {
       setVisible(false)
      }} />
     </View>
    </View>
   </View>
  </Modal>
 )
}

export default WaiverModal

const styles = StyleSheet.create({})