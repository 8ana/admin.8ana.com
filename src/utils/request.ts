import { notification } from 'antd';
import { stringify } from 'qs';
import { RequestType } from '@/types';
import { Methods, Urls } from '@/constants';
import { getLang } from '@/locales';
import { HttpError } from './error';

export class Request {
  static readonly apiPrefix: string = '';

  static async init<T>(methods: Methods, url: Urls, options: RequestType.Options): Promise<RequestType.RequestRes<T>> {
    const { params, query, data, formData, ...props } = options;

    let defaultHeader: { [key: string]: string } = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    };

    let link: string = this.apiPrefix + url;
    if (params) {
      link = link.replace(/\/:(\w+)/gm, index => `/${params[`${index.replace(/\/:/g, '')}`]}`);
    }

    if (query) {
      Object.keys(query).forEach(item => {
        if (!query[item] && query[item] !== 0) delete query[item];
      });

      link += `?${stringify(query)}`;
    }

    if (formData) {
      defaultHeader = {};
    }

    return fetch(link, {
      body: formData ? formData : data ? JSON.stringify(data) : null,
      headers: {
        ...defaultHeader,
        Authorization: sessionStorage.getItem('token') || '',
      },
      method: methods,
      ...props,
    })
      .then(this.statusCheck)
      .then(this.resFormat)
      .catch(this.errorHandler);
  }

  static async resFormat(res: Response) {
    const newRes = await res.json();
    return {
      ...newRes,
      response: res,
    };
  }

  static statusCheck(res: Response): Response {
    if (![200, 201, 306].includes(res.status)) {
      throw new HttpError(res.status, res.url);
    }
    return res;
  }

  static errorHandler(error: HttpError) {
    if (error.status === 401) {
      sessionStorage.clear();
      notification.error({
        message: getLang('common.error.needAuth'),
      });
    } else {
      notification.error({
        message: getLang('common.error.api'),
        description: error.url,
        style: {
          wordBreak: 'break-all',
        },
      });
    }
    throw new HttpError(error.status, error.url);
  }
}
