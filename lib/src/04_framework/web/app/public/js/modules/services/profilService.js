import { HEADER_AUTHORIZATION, URL } from "./apiServices.js";


export async function fetchProfil(token) {
  console.log(token);
  try {
    const res = await fetch(URL + "/profil/search-by/account", {
      method: "GET",
      headers: {
        "authorization": HEADER_AUTHORIZATION + " Bearer " + token
      },
    });
    if (res.status == 200) {
      const data = await res.json();
      return data;
    } else if (res.status == 400) {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function updateMyProfil(token, id, data) {
  try {
    const res = await fetch(URL + "/profil/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "authorization": HEADER_AUTHORIZATION + " Bearer " + token
      },
      body: JSON.stringify(data)
    });
    if (res.status == 200) {
      const data = await res.json();
      return data;
    } else if (res.status == 400) {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
