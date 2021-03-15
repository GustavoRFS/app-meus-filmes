import React from 'react';
import {View, ScrollView, StyleSheet, Image, Text, Button} from 'react-native';
import TextInput from '../components/TextInput';
import Picker from 'react-native-dropdown-picker';
import api from '../api/api';
import Toast from 'react-native-simple-toast';

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  form: {
    marginTop: 40,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: 360,
    height: 350,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  whoYouAre: {color: '#fafafa', fontSize: 16},
});

export default (props) => {
  var email, password, passwordConfirmation;
  var name = null;
  return (
    <View style={{flex: 1, backgroundColor: '#1e1e1e'}}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            borderRadius: 20,
            alignSelf: 'center',
            backgroundColor: '#0b0b0b',
            justifyContent: 'center',
            width: 180,
            height: 180,
          }}>
          <Image style={styles.image} source={require('../assets/icon.png')} />
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => {
              email = text;
            }}
          />
          <TextInput
            placeholder="Senha"
            onChangeText={(text) => {
              password = text;
            }}
            secureTextEntry={true}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Confirmação da Senha"
            onChangeText={(text) => {
              passwordConfirmation = text;
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.whoYouAre}>Você é </Text>
            <Picker
              containerStyle={{
                width: 130,
                height: 30,
              }}
              arrowColor="#fafafa"
              dropDownStyle={{backgroundColor: '#2f2f2f'}}
              labelStyle={{color: '#fafafa'}}
              style={{backgroundColor: '#1e1e1e'}}
              defaultValue={name}
              placeholder="Selecione"
              onChangeItem={(item) => {
                name = item.value;
              }}
              items={[
                {label: 'a Bururu', value: 'Bururu'},
                {label: 'o Gururu', value: 'Gururu'},
              ]}
            />
          </View>
          <View style={{width: 120, alignSelf: 'center', zIndex: -1}}>
            <Button
              title="Cadastrar"
              color="#bf2f2f"
              onPress={() => {
                if (!name) {
                  Toast.show('Selecione quem é você');
                } else if (!email || !email.trim()) {
                  Toast.show('Insira seu email');
                } else if (!password) {
                  Toast.show('Insira sua senha');
                } else if (!passwordConfirmation) {
                  Toast.show('Confirme sua senha');
                } else {
                  if (password === passwordConfirmation) {
                    api
                      .post('/auth/register', {name, email, password})
                      .then(() => {
                        props.navigation.pop();
                      })
                      .catch((err) => {
                        if (err.response.data) {
                          Toast.show(err.response.data.error);
                        } else {
                          Toast.show('Grrr algo deu errado ô :c');
                        }
                      });
                  } else {
                    Toast.show('As senhas não são identicas');
                  }
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};