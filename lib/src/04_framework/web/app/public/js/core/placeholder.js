
function showPlaceholder(id){
  document.querySelector("#" + id + " .ph-container").classList.remove("hidden");
  document.querySelector("#" + id + " .content").classList.add("hidden");
}

function hidePlaceholder(id){
  document.querySelector("#" + id + " .ph-container").classList.add("hidden");
  document.querySelector("#" + id + " .content").classList.remove("hidden");
}