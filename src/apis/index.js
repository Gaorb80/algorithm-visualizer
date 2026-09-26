import Promise from 'bluebird';
import axios from 'axios';
import {
  DSA_SINGLY_LINKED_LIST_JS,
  DSA_SINGLY_LINKED_LIST_MD,
  DSA_DOUBLY_LINKED_LIST_JS,
  DSA_DOUBLY_LINKED_LIST_MD,
} from 'files';
import { runClientTracerCode } from 'core/tracers/clientTracerRunner';

axios.interceptors.response.use(response => response.data);

const request = (url, process) => {
  const tokens = url.split('/');
  const baseURL = /^https?:\/\//i.test(url) ? '' : '/api';
  return (...args) => {
    const mappedURL = baseURL + tokens.map((token, i) => token.startsWith(':') ? args.shift() : token).join('/');
    return Promise.resolve(process(mappedURL, args));
  };
};

const GET = URL => {
  return request(URL, (mappedURL, args) => {
    const [params, cancelToken] = args;
    return axios.get(mappedURL, { params, cancelToken });
  });
};

const DELETE = URL => {
  return request(URL, (mappedURL, args) => {
    const [params, cancelToken] = args;
    return axios.delete(mappedURL, { params, cancelToken });
  });
};

const POST = URL => {
  return request(URL, (mappedURL, args) => {
    const [body, params, cancelToken] = args;
    return axios.post(mappedURL, body, { params, cancelToken });
  });
};

const PUT = URL => {
  return request(URL, (mappedURL, args) => {
    const [body, params, cancelToken] = args;
    return axios.put(mappedURL, body, { params, cancelToken });
  });
};

const PATCH = URL => {
  return request(URL, (mappedURL, args) => {
    const [body, params, cancelToken] = args;
    return axios.patch(mappedURL, body, { params, cancelToken });
  });
};


const LOCAL_DSA_CATEGORY = {
  key: 'dsa-linked-list',
  name: 'DSA - Danh Sách Liên Kết (HDU)',
  algorithms: [
    {
      key: 'singly-linked-list-deletion',
      name: 'DS Liên Kết Đơn (xoaDau, xoaCuoi, xoaViTriK)',
    },
    {
      key: 'doubly-linked-list-deletion',
      name: 'DS Liên Kết Đôi (xoaDau, xoaCuoi, xoaViTriK)',
    },
  ],
};

const LOCAL_DSA_ALGORITHMS = {
  'singly-linked-list-deletion': {
    categoryKey: 'dsa-linked-list',
    categoryName: 'DSA - Danh Sách Liên Kết (HDU)',
    algorithmKey: 'singly-linked-list-deletion',
    algorithmName: 'DS Liên Kết Đơn (xoaDau, xoaCuoi, xoaViTriK)',
    description: 'Mô phỏng trực quan các hàm xóa trong danh sách liên kết đơn (00-Danh_Sach_1_chieu.cpp)',
    files: [DSA_SINGLY_LINKED_LIST_MD, DSA_SINGLY_LINKED_LIST_JS],
  },
  'doubly-linked-list-deletion': {
    categoryKey: 'dsa-linked-list',
    categoryName: 'DSA - Danh Sách Liên Kết (HDU)',
    algorithmKey: 'doubly-linked-list-deletion',
    algorithmName: 'DS Liên Kết Đôi (xoaDau, xoaCuoi, xoaViTriK)',
    description: 'Mô phỏng trực quan các hàm xóa trong danh sách liên kết đôi (02-Lien_Ket_Doi_Dap_An.cpp)',
    files: [DSA_DOUBLY_LINKED_LIST_MD, DSA_DOUBLY_LINKED_LIST_JS],
  },
};

const rawGetCategories = GET('/algorithms');
const rawGetAlgorithm = GET('/algorithms/:categoryKey/:algorithmKey');

const AlgorithmApi = {
  getCategories: () => {
    return rawGetCategories()
      .then(({ categories = [] }) => ({
        categories: [LOCAL_DSA_CATEGORY, ...categories.filter(c => c.key !== LOCAL_DSA_CATEGORY.key)],
      }))
      .catch(() => ({
        categories: [LOCAL_DSA_CATEGORY],
      }));
  },
  getAlgorithm: (categoryKey, algorithmKey) => {
    if (categoryKey === 'dsa-linked-list' && LOCAL_DSA_ALGORITHMS[algorithmKey]) {
      return Promise.resolve({
        algorithm: LOCAL_DSA_ALGORITHMS[algorithmKey],
      });
    }
    return rawGetAlgorithm(categoryKey, algorithmKey);
  },
};

const VisualizationApi = {
  getVisualization: GET('/visualizations/:visualizationId'),
};

const GitHubApi = {
  auth: token => Promise.resolve(axios.defaults.headers.common['Authorization'] = token && `token ${token}`),
  getUser: GET('https://api.github.com/user'),
  listGists: GET('https://api.github.com/gists'),
  createGist: POST('https://api.github.com/gists'),
  editGist: PATCH('https://api.github.com/gists/:id'),
  getGist: GET('https://api.github.com/gists/:id'),
  deleteGist: DELETE('https://api.github.com/gists/:id'),
  forkGist: POST('https://api.github.com/gists/:id/forks'),
};


const TracerApi = {
  md: ({ code }) => Promise.resolve([{
    key: 'markdown',
    method: 'MarkdownTracer',
    args: ['Markdown'],
  }, {
    key: 'markdown',
    method: 'set',
    args: [code],
  }, {
    key: null,
    method: 'setRoot',
    args: ['markdown'],
  }]),
  json: ({ code }) => new Promise(resolve => resolve(JSON.parse(code))),
  js: ({ code }, params, cancelToken) => {
    try {
      const commands = runClientTracerCode(code);
      return Promise.resolve(commands);
    } catch (err) {
      return new Promise((resolve, reject) => {
        try {
          const worker = new Worker('/api/tracers/js/worker');
          if (cancelToken) {
            cancelToken.promise.then(cancel => {
              worker.terminate();
              reject(cancel);
            });
          }
          worker.onmessage = e => {
            worker.terminate();
            resolve(e.data);
          };
          worker.onerror = error => {
            worker.terminate();
            reject(err);
          };
          worker.postMessage(code);
        } catch (e) {
          reject(err);
        }
      });
    }
  },
  cpp: POST('/tracers/cpp'),
  java: POST('/tracers/java'),
};

export {
  AlgorithmApi,
  VisualizationApi,
  GitHubApi,
  TracerApi,
};
