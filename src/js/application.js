//const React = require('react')
//const ReactDOM = require('react-dom')

const DUMMY_DATA = [
  {
    id: 1,
    senderId: 'perborgen',
    text: 'who\'ll win?'
  },
  {
    id: 2,
    senderId: 'janedoe',
    text: 'who\'ll win?'
  },
  {
    id: 3,
    senderId: 'janedoe',
    text: 'who\'ll win?'
  },
  {
    id: 4,
    senderId: 'janedoe',
    text: 'who\'ll win?'
  },
  {
    id: 5,
    senderId: 'janedoe',
    text: 'who\'ll win?'
  }
]

class ChatApp extends React.Component {
  constructor () {
    super()
    this.state = {
      messages: DUMMY_DATA
    }
  }

  render () {
    return (
      <div className='app'>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm />
      </div>
    )
  }
}

class MessageList extends React.Component {
  render () {
    return (
      <ul className="message-list">
        {this.props.messages.map(message => {
          return (
            <li className="message" key={message.id}>
              <div className="sender">
                {message.senderId}
              </div>
              <div className="message-body">
                {message.text}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

class SendMessageForm extends React.Component {
  render () {
    return (
      <p>Send Message Form</p>
    )
  }
}

ReactDOM.render(<ChatApp />, document.getElementById('chatApp'))
