import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { BottomView, Button } from '@shared/index';

const HomeScreen = () => {
  const email = useAppSelector(state => state.user.email);
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Open" onPress={() => setOpen(true)} />

      <BottomView
        visible={open}
        onRequestClose={() => setOpen(false)}
        title="Start Wound"
        primaryAction={{ label: 'Update', onPress: () => setOpen(false) }}
        secondaryAction={{ label: 'Cancel', onPress: () => setOpen(false) }}
      >
        <Text>Upload the Image for Wound Detection estimation</Text>
      </BottomView>
      {email && <Text style={styles.email}>Logged in as: {email}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default HomeScreen;
