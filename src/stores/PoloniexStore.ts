import {Platform} from 'react-native';
import {makeObservable, observable, action} from 'mobx';
import {ITicker, IQuotePair} from '../types/poloniex';
import {PoloniexRequest} from '../request/PoloniexRequest';
import BackgroundTimer from 'react-native-background-timer';

export class PoloniexStore {
  static intervalId: number | null = null;

  errorIteration: number = 3;
  numIteration: number = 0;

  private request: PoloniexRequest | null = null;

  loading: boolean = false;

  error: Error | null = null;

  data: IQuotePair[] = [];

  constructor() {
    makeObservable(this, {
      loading: observable,
      error: observable,
      data: observable,
      load: action,
    });
  }

  load(): void {
    if (this.request === null) {
      this.request = new PoloniexRequest();
    }

    this.loading = true;
    this.request
      .quotes()
      .then(
        action((ticker: ITicker) => {
          const _data: IQuotePair[] = [];
          Object.keys(ticker).forEach((pair) => {
            //console.log({pair, quote: ticker[pair]});
            ticker[pair].name = pair;
            _data.push(ticker[pair]);
          });
          this.data = _data;
          this.error = null;
          this.loading = false;
          if (this.numIteration === this.errorIteration) {
            this.numIteration = 0;
            throw new Error('Ошибка парсинга');
          }
          this.numIteration += 1;
        }),
      )
      .catch(
        action((e: Error) => {
          this.error = e;
          this.loading = false;
          console.log(e);
        }),
      );
  }

  async poll(route: string): Promise<void> {
    this.clearPoll();
    if (route === 'Quotes') {
      console.log('START POLL');
      await this.load();
      if (Platform.OS === 'ios') {
        BackgroundTimer.start();
      }
      PoloniexStore.intervalId = BackgroundTimer.setInterval(async () => {
        await this.load();
      }, 5000);
    }
  }

  clearPoll(): void {
    if (PoloniexStore.intervalId) {
      console.log('STOP POLL');
      BackgroundTimer.clearInterval(PoloniexStore.intervalId);
      PoloniexStore.intervalId = null;
    }
  }
}

export const poloniexStore = new PoloniexStore();
