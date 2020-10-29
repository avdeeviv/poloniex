/**
 * Created by kirill on 31.10.2017.
 */
import RNFetchBlob from 'rn-fetch-blob';

export class BaseRequest {
  constructor(protected baseUrl: string | undefined = '') {}

  async fetch(
    url: string,
    method: Methods = 'GET',
    body?: any,
    headers?: {[key: string]: string},
  ): Promise<any> {
    const fullUrl = `${this.baseUrl}/${url}`;
    return RNFetchBlob.config({timeout: 4500, trusty: true})
      .fetch(method, fullUrl, headers, body)
      .then((r) => {
        if (r.respInfo.status < 200 || r.respInfo.status >= 300) {
          throw new Error(r.respInfo.status.toString());
        }
        return r;
      });
  }

  async fetchJSON(
    url: string,
    method: Methods = 'GET',
    body?: any,
    headers?: {[key: string]: string},
  ): Promise<any> {
    return this.fetch(url, method, body, headers).then((r) => {
      const data = r.json();
      return data;
    });
  }
}

type Methods =
  | 'POST'
  | 'GET'
  | 'DELETE'
  | 'PUT'
  | 'post'
  | 'get'
  | 'delete'
  | 'put';
