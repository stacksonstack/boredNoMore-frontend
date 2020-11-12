//document.addEventListener('DOMContentLoaded', () => {
let activityList = document.getElementById("activity-list");
let activityName = document.getElementById("activity-name");
let activityType = document.getElementById("activity-type");
let activityParticipants = document.getElementById("activity-participants");
let activityPrice = document.getElementById("activity-price");
let activityLink = document.getElementById("activity-link");
let activityAccess = document.getElementById("activity-access");
let addBtn2 = document.getElementById("add-activity2");
const userName = document.getElementById("username");
const userList = document.getElementById("user-list");
const randomBtn = document.getElementById("random-btn");

const showAllActivities = document.getElementById("all-activities");
const userActivities = document.getElementById("user-activities");

const randomActivityGrid = document.querySelector(".activity-grid");
const userActivityList = document.querySelector(".wrapper");
const allActivitiesGrid =document.querySelector(".activities-grid")

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
    li.className = "li-activity";
    let addBtn = createNode("button", "Add Activity");
    addBtn.className = "add-btn"
    let br = createNode("p", "");
    li.append(br, addBtn);
    activityList.append(li);
    renderActivityInfo(activity);
    addActivity(addBtn, activity);
  });
}

function renderActivityInfo(activity) {
  activityName.innerHTML = activity.name;
  activityType.innerHTML = `<b>Activity Type: </b>${activity.activity_type}`;
  activityParticipants.innerHTML = `<b>Number of Participants: </b>${activity.participants}`;
  activityPrice.innerHTML = `<b>Price: </b>${activity.price}`;
  activityLink.innerHTML = `<b>Activity Link: </b>${activity.activity_link}`;
  activityAccess.innerHTML = `<b>Accessibility: </b>${activity.accessibility}`;
}

function createNode(elemType, stringContent) {
  let node = document.createElement(elemType);
  node.innerHTML = stringContent;
  return node;
}

function addActivity(btn, activity) {
  btn.addEventListener("click", (e) => {
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
        persistsData({ name: activity.name, id: data.id });
      });
  });
}

function deleteActivity(btn, id, activity) {
  btn.addEventListener("click", (e) => {
    fetch(`http://localhost:3000/api/v1/user_activities/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
    activity.remove();
  });
}

function randomActivity(activityObj) {
  randomBtn.addEventListener("click", (e) => {
    randomActivityGrid.style.display = "block";
    allActivitiesGrid.style.display = "none";
    userActivityList.style.display = "none";
    let random = activityObj[Math.floor(Math.random() * activityObj.length)];
    renderActivityInfo(random);
    addActivity(addBtn2, random);
  });
}

function renderUser(data) {
  userName.innerHTML = data.username;
}

function renderUserActivity({ user_activities }) {
  user_activities.forEach(fetchUserActivity);
}

function fetchUserAndActivities(id) {
  fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      renderUser(data);
      renderUserActivity(data);
    });
}

function persistsData({ name, id }) {
  let newActivity = createNode("li", name);
  newActivity.className = "new-li";
  let deleteBtn = createNode("button", "Delete");
  deleteBtn.className = "delete-btn"
  let newBr = createNode("p", "");
  newActivity.append(newBr, deleteBtn);
  userList.append(newActivity);
  deleteActivity(deleteBtn, id, newActivity);
}

function fetchUserActivity({ activity_id, id }) {
  fetch(`http://localhost:3000/api/v1/activities/${activity_id}`)
    .then((resp) => resp.json())
    .then((data) => persistsData({ name: data.name, id: id }));
}

function AllActivitiesPage(){
    showAllActivities.addEventListener("click", (e) => {
        randomActivityGrid.style.display = "none";
        userActivityList.style.display = "none";
        allActivitiesGrid.style.display = "block"
        console.log("all")
    })
}
function landingPage(){
  userActivityList.style.display = "none";
  randomActivityGrid.style.display = "none"
}

function UserActivitiesPage(){
  userActivities.addEventListener('click', (e) => {
    randomActivityGrid.style.display = "none"
    allActivitiesGrid.style.display = "none"
    userActivityList.style.display = "block"
  })
}

landingPage();
allActivities();
fetchUserAndActivities(30);
AllActivitiesPage();
UserActivitiesPage();