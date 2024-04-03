import { DataProvider } from "react-admin";
import queryString from "query-string";
import { http } from "./axios";
const { stringify } = queryString;

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
const apiUrl = `${backendUrl}api/v1`;

export const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      perPage,
      page,
      field,
      order,
      personName: params.filter.personName,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return http.get(url).then(({ data, headers }) => ({
      data,
      total: parseInt(headers["content-range"].split("/").pop(), 10),
    }));
  },

  getOne: (resource, params) => {
    return http.get(`${apiUrl}/${resource}/${params.id}`).then(({ data }) => ({
      data,
    }));
  },

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return http.get(url).then(({ data }) => ({ data }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return http.get(url).then(({ data }) => ({
      data,
      // total: parseInt(
      //   (headers.get("content-range") || "0").split("/").pop() || "0",
      //   10
      // ),
    }));
  },

  update: (resource, params) =>
    http
      .put(`${apiUrl}/${resource}/${params.id}`, params.data)
      .then(({ data }) => ({ data })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };

    return http
      .put(`${apiUrl}/${resource}?${stringify(query)}`, {
        method: "PUT",
        body: JSON.stringify(params.data),
      })
      .then(({ data }) => ({ data }));
  },

  create: (resource, params) =>
    http.post(`${apiUrl}/${resource}`, params.data).then(({ data }) => ({
      data,
    })),

  delete: (resource, params) =>
    http
      .delete(`${apiUrl}/${resource}/${params.id}`)
      .then(({ data }) => ({ data })),

  deleteMany: (resource, params) =>
    http
      .delete(`${apiUrl}/${resource}`, {
        params,
      })
      .then(({ data = [] }) => ({ data })),
};
