import * as React from 'react';
import {Component} from 'react';
import {FlatList, View, ViewStyle, ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react';
import {stores} from '../stores/Stores';
import {IQuotePair} from '../types/poloniex';
import {Item} from './Item';
import {Header} from './Header';
import {ErrorRow} from './ErrorRow';

export const Table = observer(
  class Table extends Component<ITableProps, ITableState> {
    private keyExtractor = (item: IQuotePair): string => {
      return `${item.id}`;
    };

    private renderItem = ({item}: {item: IQuotePair}): JSX.Element => {
      return <Item quote={item} />;
    };

    private renderLoading = (): JSX.Element | null => {
      if (stores.poloniex.loading) {
        return (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        );
      } else {
        return null;
      }
    };

    private renderError = (): JSX.Element | null => {
      if (stores.poloniex.error) {
        return <ErrorRow error={stores.poloniex.error} />;
      } else {
        return null;
      }
    };

    render(): JSX.Element {
      return (
        <View style={styles.container}>
          {this.renderLoading()}
          <Header />
          {this.renderError()}
          <FlatList
            data={stores.poloniex.data}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      );
    }
  },
);

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  } as ViewStyle,
  loading: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
};

interface ITableProps {}

interface ITableState {}
