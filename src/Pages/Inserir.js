import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useState } from 'react'

export default function Inserir() {
  const [clientNome, setNome] = useState("")
  const [clientEmail, setEmail] = useState("")
  const [sucesso, setSucesso] = useState(false)
  const [erro, setErro] = useState(false)

  async function Cadastro() {
    {
      await fetch('http://10.139.75.43:5251/api/Clients/CreateClient/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({

          clientName: clientNome,
          clientEmail: clientEmail,

        })
      })
        .then(res => (res.ok == true) ? res.json() : false)
        .then(json => console.log(json))
        .catch(err => setErro(true))

    }
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'gray' }}>
      {sucesso ? <Text>CERTO</Text> :
        <>
          <TextInput
            style={{ width: '80%', height: 50, backgroundColor: 'black', color: 'white', borderRadius: 5, marginTop: 20 }}
            placeholder=" Nome" placeholderTextColor={'white'} onChangeText={(digitado) => setNome(digitado)} TextInput={clientNome}
          />
          <TextInput
            style={{ width: '80%', height: 50, backgroundColor: 'black', color: 'white', borderRadius: 5, marginTop: 20 }}
            placeholder="Email" placeholderTextColor={'white'} onChangeText={(digitado) => setEmail(digitado)} TextInput={clientEmail}
          />

        </>

      }
      {erro && <Text>ERRADO</Text>}

      <TouchableOpacity onPress={Cadastro} style={{ width: '80%', height: 40, backgroundColor: 'white', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}><Text>Inserir</Text></TouchableOpacity>
    </ScrollView>)
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  }
})