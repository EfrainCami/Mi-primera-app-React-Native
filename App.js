import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity , Button, Alert, Platform } from 'react-native';
import image from './assets/ranita.png';
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";
import { useState } from 'react';

//Si de la nada muestra que faltan módulos, cierra y dale npm install para que se vuelva a instalar todo

export default function App() {

  const [selectedImage, setselectedImage] = useState(null)

  let openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert("ocupo permiso para la camara");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    
    if (pickerResult.cancelled === true) {
      return;
    }

    setselectedImage({localUri: pickerResult.uri})
  }
//await es para cosas asincronas, mismas que se especifican con async
  const openShareDialog = async () => {
    if (Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    try {
      //sin el manipulador no deja compartir, pero así ya se arregló yujuu
      const imageTemp = await ImageManipulator.manipulateAsync(selectedImage.localUri);
      await Sharing.shareAsync(imageTemp.uri);
    }catch (error){
      console.log(error);
      console.log(selectedImage.localUri);
    }

    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola mundo</Text>
      <TouchableOpacity onPress={openImagePicker}>
        <Image
          source={{uri: selectedImage !== null ? selectedImage.localUri : "https://picsum.photos/200/300"}}
          style={styles.photo}
        />
      </TouchableOpacity>
      
      <Button 
        title='Boton chafa'
        color="#000"
        onPress={() => Alert.alert('Este es un botón pre-hecho de React y casi no se usa, pues no se puede personalizar casi nada')}
      />
      {selectedImage ? 

        <TouchableOpacity 
        onPress={openShareDialog}
        style={styles.button}>
        <Text style={styles.buttonText}>Botón mejor</Text>
        </TouchableOpacity>

        : <View/>

      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    backgroundColor: '#b5b5b5',
    fontSize: 30
  },
  photo: {
    height: 300, 
    width: 300,
    resizeMode: "contain"
  },
  button: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 20
  },
  buttonText: {
    color: "#fff"
  }
});
