import React, { Component, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
// import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'

// * Auth
import AuthProvider from "./lib/AuthProvider";

//* Routes
import AnonRoute from "./components/componentRoutes/AnonRoute";
import PrivateRoute from "./components/componentRoutes/PrivateRoute";

// * Css
import "./App.css";

// * Components
import Navbar from "./components/fixedComponents/navbar/Navbar";

// * Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./components/profile/Profile";
import Booking from "./components/booking/Booking";
import EditBooking from "./components/booking/EditBooking";
import Community from "./components/community/Community";

// const socket = io.connect('http://localhost:4000')

function App() {
  // const [state, setState] = useState({message: '', name: ''})
  // const [chat, setChat] = useState([])


  // useEffect(() => {
  //   socket.on('message', ({name, message})=>{
  //     setChat([...chat, {name, message}])
  //   })
  // })

  // const onTextChange = e => {
  //   setState({...state, [e.target.name]: e.target.value})
  // }

  // const onMessageSubmit = (e) => {
  //   e.preventDefault()
  //   const {name, message} = state
  //   socket.emit('message', {name, message})
  //   setState({message:'', name})
  // }


  // const renderChat = () => {
  //   return chat.map(({name, message}, index) =>(
  //     <div>
  //       <h3>{name}: <span>{message}</span></h3>
  //     </div>
  //   ))
  // }
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />
          {/* <div>
            <form onSubmit={onMessageSubmit}>
                <h1>Messanger</h1>
                <div>
                  <TextField name="name" onChange={e => onTextChange(e)} value={state.name} label="Name"/>
                </div>
                <div>
                  <TextField name="message" onChange={e => onTextChange(e)} value={state.message} label="Message"/>
                </div>
                <button>Send Message</button>
            </form>
           <div className="render-chat">
             <h1>Chat Log</h1>
             {renderChat()}
           </div>
          </div> */}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/community" component={Community} />
            <AnonRoute exact path="/login" component={Login} />
            <AnonRoute exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/booking" component={Booking} />
            <PrivateRoute exact path="/booking/:id" component={EditBooking} />
          </Switch>
        </div>
      </AuthProvider>
    );
}

export default App;
