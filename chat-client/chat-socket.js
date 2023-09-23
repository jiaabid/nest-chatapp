window.onload = () => {
  let socket = ""
  let room = ""
  let id = generateUniqueId()
  let isRepresentative = prompt('are u representative')
  document.querySelector('h3').innerHTML = isRepresentative
  if (isRepresentative == 'yes') {
    socket = io('http://localhost:3000/', {
      query: { token: "abc" }
    })
    document.querySelector('h3').innerHTML = id
    socket.on('connect', data => {
      console.log(data, socket)
    })

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
    socket.on('new-user', data => {
      let ul = document.querySelector('ul')
      ul.innerHTML += `<li>${data.visitorId}<button class='btn'>Accept</button></li>`
      attachEvent()
    })
    function attachEvent() {
      document.querySelectorAll('.btn').forEach((btn) => {
        btn.addEventListener('click', acceptUser);
      });
    }

    //accept the user
    function acceptUser() {
      let userid = prompt('Enter the user id')
      socket.emit("accept-user", { visitorId: userid, representativeId:id })
    }
  } else {
    socket = io('http://localhost:3000/')
    document.querySelector('h3').innerHTML =id
    socket.on('connect', data => {
      console.log(data, socket)
    })
    socket.emit('connect-visitor',{visitorId:id})
    //user section
    socket.on("join-room-request", data => {
      console.log(data)
      room = data.room
      socket.emit('join-room', { room })
    })
  }

  socket.on("join-room-request", data => {
    console.log(data)

    room = data.room
    socket.emit('join-room', { room })
  })

  document.getElementById('sendMsg').addEventListener('click', (e) => {
    e.preventDefault();
    let message = prompt('Enter the Message');
    socket.emit('send-message', {
      message,
      to: room,
      from:id
    });
  })

  socket.on('message', data => {
    alert(data.message)
  })
  socket.on('error', payload => {
    console.log(payload.message)
  })

  document.getElementById('sendRequest').addEventListener('click',e=>{
    e.preventDefault()
    let room = prompt('Enter room id')
    socket.emit('get-room',{room})
  })
  socket.on('chat-history',data=>{
    console.log(data)
  })

}
function generateUniqueId(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}


  socket.on('message', (data) => {
    alert(data.message);
  });
  socket.on('error', (payload) => {
    console.log(payload.message);
  });
};
