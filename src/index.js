//document.addEventListener('DOMContentLoaded', () => {
let activityList = document.getElementById("activity-list");

const allActivities = () => {
  fetch("http://localhost:3000/api/v1/activities")
    .then((resp) => resp.json())
    .then((activityObj) => renderActivity(activityObj));
};

function renderActivity(data) {
  data.forEach((activity) => {
    let li = createNode("li", activity.name)
    activityList.append(li);
    renderActivityInfo(activity)
  });
}

function renderActivityInfo(activity){
    
}

function createNode(elemType, stringContent){
    let node = document.createElement(elemType)
    node.innerHTML = stringContent
    return node
}


// const allUsers = () => {
//     fetch("http://localhost:3000/api/v1/users")
//     .then(resp => resp.json())
//     .then(userObj => console.log(userObj))
// }

allActivities();
//allUsers();
//})