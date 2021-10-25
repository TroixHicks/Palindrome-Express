
document.querySelector('button').addEventListener('click', makeReq)

function makeReq(){

  const userName = document.querySelector("#userName").value;

  fetch(`/api?student=${userName}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#results").textContent = data.isPalindrome
      
    });

}