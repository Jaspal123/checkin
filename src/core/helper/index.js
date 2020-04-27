export const signup = user => {
  console.log(user)
  return fetch(`http://127.0.0.1:5000/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err));
};
