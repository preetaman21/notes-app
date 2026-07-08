import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

interface Noteint {
  id:string,
  name:string,
  description:string,
}
const App = () => {
  const [note, setNote] = useState('');   
  const [description, setDescription] = useState('');
  const [notes,setNotes] = useState <Noteint[]>([])     


  function handleaddnote (){
    if (note.trim() === "" || description.trim()===""){
      return;
    }
    
    const newNote: Noteint = {
      id: Date.now().toString(),
      name: note,
      description: description,
    };
    setNotes([...notes, newNote]);
    setNote("");
    setDescription("")
  }
  

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <View className="items-center justify-between p-4">
            <Text className="text-xl font-bold">Notes</Text>
            <TextInput className="border border-gray-300 p-2 mb-2 mt-4 rounded-2xl" placeholder="Enter Note..." 
            value={note} onChangeText={setNote}/>
            <TextInput className="border border-gray-300 p-2 mb-2 mt-2 rounded-2xl" placeholder="Enter Description..." 
            value={description} onChangeText={setDescription}/>
            <Pressable onPress={handleaddnote}>
              <Text className="mt-4 p-2 bg-yellow-50 font-bold">Add Note</Text>
            </Pressable>
          </View>

<View>
  <Text>Notes - </Text>
  <View>
    {notes.length===0 ? (
      <View>
        <Text>No NOtes Available</Text>
      </View>
    ) : (
      <View>
        <Text> Total Notes - {notes.length} </Text>
        <View>
          <FlatList 
          data = {notes}
          keyExtractor={(item)=>item.id}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          )}/>
        </View>
      </View>
    )}
  </View>
</View>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
