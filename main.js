const usernameLogin = 'demo';
const passwordLogin = 'demo';

const title = document.getElementById('title');
const username = document.getElementById('username');
const password = document.getElementById('password');
const description = document.getElementById('description');

let data = [];
let selectedIndex = null;

function login(e) {
  e.preventDefault();

  const username = document.getElementById('usernameLogin');
  const password = document.getElementById('passwordLogin');

  if (usernameLogin === username.value && passwordLogin === password.value) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('passwordManagerSection').style.display = 'block';
  }
}

function resetForm() {
  title.value = '';
  username.value = '';
  password.value = '';
  description.value = '';

  selectedIndex = null;
}

function generatePassword(len) {
  let res = '';
  let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_)(';

  for (let i = 0; i < len; i++) {
    res += char.charAt(Math.floor(Math.random() * char.length));
  }

  password.value = res;
}

function submitForm(e) {
  e.preventDefault();

  if (selectedIndex !== null) {
    data[selectedIndex].title = title.value;
    data[selectedIndex].username = username.value;
    data[selectedIndex].password = password.value;
    data[selectedIndex].description = description.value;
  } else {
    data.push({
      title: title.value,
      username: username.value,
      password: password.value,
      description: description.value,
    });
  }

  localStorage.setItem('data', JSON.stringify(data));

  resetForm();
  renderData();
}

onLoad();
function onLoad() {
  const lsData = localStorage.getItem('data');
  data = lsData ? JSON.parse(lsData) : [];

  renderData();
}

function renderData() {
  let html = '';

  if (data.length) {
    data.forEach((r, i) => {
      html += `<tr>
      <td>
        <button onClick="editData(${i})" class="btn btn-warning">Edit</button>
        <button onClick="removeData(${i})" class="btn btn-danger">Remove</button>
      </td>
      <td>${r.title}</td>
      <td>${r.username}</td>
      <td>${r.password}</td>
      <td>${r.description}</td>
    </tr>`;
    });
  } else {
    html = '<tr><td colspan="5" class="text-center">Data kosong</td></tr>';
  }

  document.getElementById('dataTable').innerHTML = html;
}

function removeData(index) {
  if (confirm('yakin nih???')) {
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));

    renderData();
  }
}

function editData(index) {
  const selectedData = data[index];

  selectedIndex = index;
  title.value = selectedData.title;
  username.value = selectedData.username;
  password.value = selectedData.password;
  description.value = selectedData.description;
}

document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('form').addEventListener('submit', submitForm);
