const socket = io('http://localhost:3000/')

const message = document.getElementById('message');
const messages = document.getElementById('messages');
console.log(socket.id)

socket.on('connect',data=>{
  console.log(data,socket)
})
const handleSubmitNewMessage = () => {
  socket.emit('hello', { data: message.value })
}

socket.on('message', ({ data }) => {
  handleNewMessage(data);
})

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(message))
  return li;
}