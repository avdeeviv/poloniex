import React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';

export function ErrorRow(props: IErrorRowProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.cell}>
        <Text style={styles.text}>{props.error.message}</Text>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  } as ViewStyle,
  cell: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  text: {
    color: 'red',
  } as TextStyle,
};

interface IErrorRowProps {
  error: Error;
}
