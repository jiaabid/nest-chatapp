window.onload = () => {
  let socket = '';
  let room = '';
  let isRepresentative = prompt('are u representative');
  document.querySelector('h3').innerHTML = isRepresentative;
  if (isRepresentative == 'yes') {
    socket = io('http://localhost:3000/', {
      query: { token: 'abc' },
    });
    document.querySelector('h3').innerHTML = socket.id;
    socket.on('connect', (data) => {
      console.log(data, socket);
    });

    //CR section
    socket.on('available-users', (data) => {
      let ul = document.querySelector('ul');
      ul.innerHTML = '';
      data.visitors.forEach((cr) => {
        ul.innerHTML += `<li>${cr.visitorId} <button class='btn'>Accept</button></li>`;
      });
      attachEvent();
    });

    socket.on('hello1234', (data) => {
      console.log(data);
    });
    //on recieving new user
    socket.on('new-user', (data) => {
      let ul = document.querySelector('ul');
      ul.innerHTML += `<li>${data.client}<button class='btn'>Accept</button></li>`;
      attachEvent();
    });
    function attachEvent() {
      document.querySelectorAll('.btn').forEach((btn) => {
        btn.addEventListener('click', acceptUser);
      });
    }

    //accept the user
    function acceptUser(id) {
      let userid = prompt('Enter the user id');
      socket.emit('accept-user', { client: userid });
    }
  } else {
    socket = io('http://localhost:3000/');
    document.querySelector('h3').innerHTML = socket.id;
    socket.on('connect', (data) => {
      console.log(data, socket);
    });
    //user section
    socket.on('join-room-request', (data) => {
      room = data.room;
      socket.emit('join-room', { room });
    });
  }

  socket.on('join-room-request', (data) => {
    room = data.room;
    socket.emit('join-room', { room });
  });

  document.getElementById('sendMsg').addEventListener('click', (e) => {
    e.preventDefault();
    let message = prompt('Enter the Message');
    socket.emit('send-message', {
      message,
      to: room,
    });
  });

  socket.on('message', (data) => {
    alert(data.message);
  });
  socket.on('error', (payload) => {
    console.log(payload.message);
  });
};
