import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
});

export const createSession = async (email, password) => {
  return api.post("/sessions/", { email, password });
};

export const getRepositories = async (userId, query) => {
  let url = `/users/repositories/${userId}/`;

  if (query !== "") {
    url += `?q=${query}`;
  }

  return api.get(url);
};

export const createRepository = async (userId, repositoryUrl) => {
  const repositoryName = getRepositoryName(repositoryUrl);
  const url = `/users/repositories/${userId}/`;

  return api.post(url, { name: repositoryName, url: repositoryUrl });
};

export const destroyRepository = async (userId, repositoryId) => {
    const url = `/users/repositories/${userId}/${repositoryId}/`;

  return api.delete(url);

}

const getRepositoryName = (repositoryUrl) => {
  // https://ihateregex.io/expr/url/
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/;

  const match = repositoryUrl.match(regex);

  if (match[2]) {
    const values = match[2].split("/");
    return `${values[1]}/${values[2]}`;
  }
};
