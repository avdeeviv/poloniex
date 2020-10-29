import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {IQuotePair} from '../types/poloniex';

export function Item(props: IItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text>{props.quote.name}</Text>
      </View>
      <View style={styles.val}>
        <Text>{props.quote.last}</Text>
      </View>
      <View style={styles.val}>
        <Text>{props.quote.highestBid}</Text>
      </View>
      <View style={styles.val}>
        <Text>{props.quote.percentChange}</Text>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  name: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  } as ViewStyle,
  val: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  } as ViewStyle,
};

interface IItemProps {
  quote: IQuotePair;
}
