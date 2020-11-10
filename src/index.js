//document.addEventListener('DOMContentLoaded', () => {
let activityList = document.getElementById("activity-list");
let activityId = document.getElementById("activity-id");
let activityName = document.getElementById("activity-name");
let activityType = document.getElementById("activity-type");
let activityParticipants = document.getElementById("activity-participants");
let activityPrice = document.getElementById("activity-price");
let activityLink = document.getElementById("activity-link");
let activityAccess = document.getElementById("activity-access");
const userName = document.getElementById("username");
const userList = document.getElementById("user-list");
const randomBtn = document.getElementById("random-btn");

const allActivities = () => {
  fetch("http://localhost:3000/api/v1/activities")
    .then((resp) => resp.json())
    .then((activityObj) => {
      renderActivity(activityObj);
      randomActivity(activityObj);
    });
};

function renderActivity(data) {
  data.forEach((activity) => {
    let li = createNode("li", activity.name);
    let addBtn = createNode("button", "Add Activity");
    addBtn.dataset.id = activity.id;
    li.append(addBtn);
    activityList.append(li);
    renderActivityInfo(activity);
    addActivity(addBtn, activity);
  });
}

function renderActivityInfo(activity) {
  activityId.innerHTML = `Activity #${activity.id}`;
  activityName.innerHTML = activity.name;
  activityType.innerHTML = `Activity Type: ${activity.activity_type}`;
  activityParticipants.innerHTML = `Number of Participants: ${activity.participants}`;
  activityPrice.innerHTML = `Price: ${activity.price}`;
  activityLink.innerHTML = `Activity Link: ${activity.activity_link}`;
  activityAccess.innerHTML = `Accessibility: ${activity.accessibility}`;
}

function createNode(elemType, stringContent) {
  let node = document.createElement(elemType);
  node.innerHTML = stringContent;
  return node;
}

function addActivity(btn, activity) {
  btn.addEventListener("click", (e) => {
    let newActivity = createNode("li", activity.name)
    let deleteBtn = createNode("button", "delete")
    deleteBtn.dataset.id = activity.id;
    //    console.log(activity.id)
    fetch("http://localhost:3000/api/v1/user_activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_activities: {
          user_id: 30,
          activity_id: activity.id,
        },
      }),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
      });

    newActivity.append(deleteBtn);
    userList.append(newActivity);
    deleteActivity(deleteBtn, activity, newActivity);
  });
}

function deleteActivity(btn, activity, newActivity) {
  btn.addEventListener("click", (e) => {
    console.log("delete click");
    newActivity.remove();
  });
}

function randomActivity(activityObj) {
  randomBtn.addEventListener("click", (e) => {
    console.log("Random Click");
    let random = activityObj[Math.floor(Math.random() * activityObj.length)];
    renderActivityInfo(random);
  });
}

const allUsers = () => {
  fetch("http://localhost:3000/api/v1/users")
    .then((resp) => resp.json())
    .then((userObj) => renderUser(userObj));
};

function renderUser(data) {
  data.forEach((user) => {
    userName.innerHTML = user.username;
  });
}

allActivities();
allUsers();

// const options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   },
//   body: JSON.stringify({
//       user_id: 1,
//       activity_id: 1
//   }),
// }

// fetch("http://localhost:3000/api/v1/user_activities", options)
// .then(resp => resp.json())
// .then(data => console.log("it worked"))
