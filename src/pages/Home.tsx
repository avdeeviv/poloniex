import React from 'react';
import {SafeAreaView} from 'react-native';
import {TabNavigator} from './TabNavigator';

export const Home = (props: any): React.ReactElement => {
  return (
    <SafeAreaView style={styles.container}>
      <TabNavigator {...props} />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
};
