import {BaseRequest} from './BaseRequest';
import {ITicker} from '../types/poloniex';

export class PoloniexRequest extends BaseRequest {
  static URL: string = 'https://poloniex.com/';

  constructor(protected baseUrl: string | undefined = PoloniexRequest.URL) {
    super(baseUrl);
  }

  quotes(): Promise<ITicker> {
    return this.fetchJSON('public?command=returnTicker');
  }
}
