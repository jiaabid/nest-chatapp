const socket = io('http://localhost:3000/',{
  query : {token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzZmQyNTI5MDNhOGQ0NTY5MjQ3YTQiLCJlbWFpbCI6InJyMUBnbWFpbC5jb20iLCJpYXQiOjE2OTE2Njk3NTh9.7RZK7rZbuQG15uYOuG5XJ5XMCbjTBYqeOoQ0YzZAYPw"}
})
let data = {}
let room=""
let client = ""
const message = document.getElementById('message');
const messages = document.getElementById('messages');

socket.on('connect',data=>{
  console.log(data,socket)
})



document.getElementById('cr').addEventListener('click',e=>{
  data = {
    role:'customer representative',
    userId:`CR-${(Math.random()*100)+1}xyzz`
  }
  document.querySelector('h1').innerHTML = data.role
  document.querySelector('h3').innerHTML = data.userId
  socket.emit('create-my-room',data)
})

document.getElementById('user').addEventListener('click',e=>{
  data = {
    role:'user',
    userId:`user-${(Math.random()*100)+1}abc`
  }
  document.querySelector('h1').innerHTML = data.role
  document.querySelector('h3').innerHTML = data.userId
  socket.emit('create-my-room',data)
})

window.onload = ()=>{
  socket.on('available-cr',data=>{
    let ul = document.querySelector('ul')
    ul.innerHTML=''
    data.forEach(cr => {
      ul.innerHTML += `<li>${cr.id}</li>`
    });
    console.log(data)
  })

  //user event
  document.getElementById('sendRequest').addEventListener('click',e=>{
    let to = prompt('Enter the CR Id')
    socket.emit('send-request',{to})
  })

  //cr event
  socket.on('connection-request',data=>{
    let accepted = confirm("Do you want to accept?")
    console.log(accepted)
    socket.emit('accept-request',{
      ...data,
      accepted
    })
  })

  //user event
  socket.on('request-reply',data=>{
    if(data.accepted){
      socket.emit('join-room',{
        room:data.from
      })
    }else{
      alert("Requet denied!")
    }
  })

  socket.on('room-joined',data=>{
     room = data.room
  })
  socket.on('client-joined',data=>{
    client = data.client
 })
  document.getElementById('sendMsg').addEventListener('click',e=>{
    e.preventDefault()
    let message = prompt('Enter the Message')
    if(data.role == 'user'){
      socket.emit('send-message',{message,
      to:room
      })
    }else{
      socket.emit('send-message',{message,
        to:client
        })
    }
    
  })

  socket.on('message',data=>{
    alert(data.message)
  })
  
}

socket.on('error',payload=>{
  console.log(payload.message)
})

