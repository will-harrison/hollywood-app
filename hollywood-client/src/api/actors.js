const BASEURL = (path = "") => `https://hollywood-api-tyrepaqott.now.sh/api/actors/${path}`;

export const getById = (id) => {
  return fetch(BASEURL(id))
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const getAll = () => {
  return fetch(BASEURL())
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const create = (data) => {
  return fetch(BASEURL(), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const remove = (id) => {
  return fetch(BASEURL(id), {
    method: "DELETE"
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const update = (id, data) => {
  return fetch(BASEURL(id), {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}
