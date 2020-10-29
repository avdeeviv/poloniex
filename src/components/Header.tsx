import React from 'react';
import {Animated, View, Text, ViewStyle, TextStyle} from 'react-native';
import {observer} from 'mobx-react';
import {stores} from '../stores/Stores';

export const Header = observer(function Header(): JSX.Element {
  const opacity = new Animated.Value(0.2);

  const show = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  if (!stores.poloniex.loading) {
    opacity.setValue(0.2);
    show();
  }

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <View style={styles.cell}>
        <Text style={styles.text}>{'Pair'}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{'Last'}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{'Highest bid'}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{'%'}</Text>
      </View>
    </Animated.View>
  );
});

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  } as ViewStyle,
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  text: {
    fontWeight: '600',
    color: 'blue',
  } as TextStyle,
};
