import CollapsibleView from '@src/components/CollapsibleView';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { clearUser } from '../redux/slices/userSlice';

const ProfileScreen = () => {
  const email = useAppSelector(state => state.user.email);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      {email && <Text style={styles.email}>Email: {email}</Text>}
      <Button title="Logout" onPress={handleLogout} />
      <CollapsibleView label="Collapsed View" value="123">
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </CollapsibleView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    marginVertical: 16,
    fontSize: 16,
  },
});

export default ProfileScreen;
