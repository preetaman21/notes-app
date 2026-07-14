import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './global.css';

interface Noteint {
  id: string;
  name: string;
  description: string;
}
const App = () => {
  const [note, setNote] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState<Noteint[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveNotes(notes);
    }
  }, [notes, isLoaded]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (e) {
      console.error('Failed to load notes', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveNotes = async (notesToSave: Noteint[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notesToSave));
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  };

  function handleaddnote() {
    if (note.trim() === '' || description.trim() === '') {
      return;
    }

    const newNote: Noteint = {
      id: Date.now().toString(),
      name: note,
      description: description,
    };
    setNotes([...notes, newNote]);
    setNote('');
    setDescription('');
  }

  function handleDeleteNote(id: string) {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-900">
        <View className="flex-1 bg-gray-900">
          <View className="items-center justify-between p-4">
            <Text className="text-4xl font-bold text-yellow-50">Notes</Text>
            <View className="m-4 w-full rounded-2xl border-2 border-gray-700 bg-gray-900 p-4">
              <TextInput
                className="mb-2 mt-4 rounded-xl border-2 border-gray-600 bg-gray-800 p-4 pl-3 text-white"
                placeholderTextColor="#d1d5db"
                placeholder="Title..."
                value={note}
                onChangeText={setNote}
              />
              <TextInput
                className="mb-2 mt-2 rounded-xl border-2 border-gray-600 bg-gray-800 p-2 pb-24 pl-3 text-white"
                placeholderTextColor="#d1d5db"
                placeholder="Description..."
                value={description}
                onChangeText={setDescription}
              />
              <Pressable onPress={handleaddnote}>
                <Text className="mt-4 rounded-xl bg-yellow-50 p-2 text-center font-bold text-gray-700">
                  Add Note
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="flex-1 m-4 rounded-2xl border-2 border-gray-700 p-2 pb-6">
            <Text className="ml-4 border-b border-gray-600 pb-2 text-xl font-bold text-yellow-50">
              Notes - ({notes.length})
            </Text>
            <View className="flex-1 pt-2">
              {notes.length === 0 ? (
                <View>
                  <Text className="ml-4 text-white">No Notes Available</Text>
                </View>
              ) : (
                <View>
                  <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View className="m-4 rounded-xl border-2 border-gray-600 p-2 ">
                        <Text className=" text-xl text-gray-100">{item.name}</Text>
                        <Text className="text-gray-200">{item.description}</Text>
                        <Pressable onPress={() => handleDeleteNote(item.id)}>
                          <Text className="mt-2 rounded-xl bg-gray-700 p-2 text-center font-bold text-yellow-50">
                            Delete
                          </Text>
                        </Pressable>
                      </View>
                    )}
                  />
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
