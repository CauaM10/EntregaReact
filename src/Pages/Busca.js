import { View, Text, StyleSheet, TextInput, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'


export default function Busca() {
  const[clients, setClients] = useState([]);
  const[error, setError] = useState(false);
  const[edicao, setEdicao] = useState(false);
  const[clientId, setClientId] = useState(0);
  const[clientName, setName] = useState();
  const[clientEmail, setEmail] = useState();
  const[clientnameSenha, setSenha] = useState();
  const[deleteResposta, setResposta] = useState(false);


  async function getClients(){
    await fetch('http://10.139.75.43:5251/api/Clients/GetAllClient',{
            method: 'GET',
            headers:{
                'content-type' : 'application/json'
            }
        })
        .then( res =>  res.json ())
        .then(json => setClients(json) )
        .catch(err => setError(true))
  }

  async function getClient(id){
    await fetch('http://10.139.75.43:5251/api/Clients/GetClientId/'+ id,{
            method: 'GET',
            headers:{
                'content-type' : 'application/json; charset=UTF-8',
            }
        })
        .then( (response) =>  response.json ())
        .then(json => {
            setClientId(json.clientId);
            setName (json.clientName);
            setEmail(json.clientEmail);
           
        } )
        
  }

  async function clientEdit(id){    
    await fetch('http://10.139.75.43:5251/api/Clients/UpdateClient/'+ clientId,{
            method: 'PUT',
            headers:{
                'content-type' : 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                clientId: clientId,
                clientName: clientName,
                clientEmail : clientEmail,                
            })
        })
        .then( (response) =>  response.json ())
        .then(err => console.log(err))
        getClients();
        setEdicao(false);
        
  }

  useEffect(() => {
    getClients();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getClients()
    },[])
  )
  function ShowAlert(id, clientName){
    Alert.alert(
      '',
      'Deseja realmente Excluir esse cliente ?',
      [
        {text : 'Sim', onPress: () => deleteClient(id, clientName)},
        {text : 'Não', onPress: () => ('')},
      ],
      { cancelanle: false}
    )
  }
  
  async function deleteClient(id, clientName) {
    await fetch('http://10.139.75.43:5251/api/Clients/DeleteClient/'+ id,{
      method: 'DELETE',
      headers:{
          'content-type' : 'application/json; charset=UTF-8',
      },
    })
    .then( res =>  res.json ())
    .then(json => setResposta (json))
    .catch(err => setError (true))

    if(deleteResposta == true)
      {
        Alert.alert(
          '',
          'Cliente ' + clientName + ' não excluido com sucesso',
          [
            {text : '', onPress: () => ('')},
            {text : 'Ok', onPress: () => ('')},
          ],
          { cancelanle: false}
        );
        getClients();
      }

      else(deleteResposta == true)
        {
          Alert.alert(
            '',
            'Cliente ' + clientName + ' foi excluido',
            [
              {text : '', onPress: () => ('')},
              {text : 'Ok', onPress: () => ('')},
            ],
            { cancelanle: false}
          );
          getClients();
        }
  }

  




  return (
    <View style={css.container}>
      {edicao == false ?
      <FlatList
      style={css.flat}
      data={clients}
      keyExtractor={(item) => item.clientId}
      renderItem={({item}) => (
        <Text style={css.text} kei={item.clientId}>
          {item.clientName}
          <TouchableOpacity style={{backgroundColor: 'green', width: 30, height: 15}} onPress={() => {setEdicao(true); getClient(item.clientId)}}>
              <Text style={css.btnLoginText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: '#ffff10', width: 30, height: 15}} onPress={() => ShowAlert(item.clientId, item.clientName)}>
              <Text style={css.btnLoginText}>Excluir</Text>
          </TouchableOpacity>
        </Text>
      )}
      />
      :
      <View>
        <TextInput
        inputMode='text'
        style={css.input}
        value={clientName}
        onChangeText={(digitado) => setName(digitado)}
        placeholderTextColor="white"
        />
        <TextInput
        inputMode="email"
        style={css.input}
        value={clientEmail}
        onChangeText={(digitado) => setEmail(digitado)}
        placeholderTextColor="white"
        />
        <TouchableOpacity style={{}} onPress={() => clientEdit()}>
          <Text style={{}}>SALVAR</Text>
        </TouchableOpacity>
      </View>
    }
    </View>
  
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
    
  },

})