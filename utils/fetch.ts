export async function getFetch(url: string) {
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin":
        "https://wl-api.mf.gov.pl/api/search/nip/9561892638?date=2023-09-10",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, access-control-allow-headers",
    },
  });

  return res.json();
}

export async function postFetch(url: string, data?: any) {
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateFetch(url: string, data?: any) {
  const res = await fetch(url, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteFetch(url: string) {
  const res = await fetch(url, {
    method: "DELETE",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
