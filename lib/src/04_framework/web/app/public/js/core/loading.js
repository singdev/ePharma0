export function displayLoading(id){
  const loading = document.getElementById(id);
  loading.classList.remove("hidden");
}

export function removeLoading(id){
  document.getElementById(id).classList.add("hidden");
}