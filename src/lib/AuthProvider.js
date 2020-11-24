// ! Lo primero que nos encontramos despues de enlazar el back con el front

// ! Crea metodos y estados para los demaas components de nuestro front

import React from "react";

// Llamadas axios a la API
import auth from "./auth-service";
import community from "./community-service";
import booking from "./booking-service";
import home from "./home-service";
import profile from "./profile-service";

const { Consumer, Provider } = React.createContext();

// * HOC para crear Consumer
// Ese component, + estos props de withAuth
const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {/* El componente <Consumer> provee un callback que recibe el "value" con el objeto Providers */}
          {({
            login,
            signup,
            user,
            logout,
            isLoggedin,
            getProfile,
            getAllUsers,
            getUserBookings,
            getDates,
            makeBooking,
            getUserGames,
            editBooking,
            getBooking,
            deleteParticipant,
            addParticipant,
          }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                getProfile={getProfile}
                getAllUsers={getAllUsers}
                getUserBookings={getUserBookings}
                getDates={getDates}
                makeBooking={makeBooking}
                getUserGames={getUserGames}
                editBooking={editBooking}
                getBooking={getBooking}
                deleteParticipant={deleteParticipant}
                addParticipant={addParticipant}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// ! Agrupamos informacion del backend
// * Provider
class AuthProvider extends React.Component {
  state = {
    isLoggedin: false,
    user: null,
    isLoading: true,
  };

  componentDidMount() {
    auth
      .me()
      .then((user) =>
        this.setState({ isLoggedin: true, user: user, isLoading: false })
      )
      .catch((err) =>
        this.setState({ isLoggedin: false, user: null, isLoading: false })
      );
  }

  signup = (user) => {
    const { username, password, email } = user;

    auth
      .signup({ username, password, email })
      .then((user) => this.setState({ isLoggedin: true, user: user }))
      .catch(({ response }) =>
        this.setState({ message: response.data.statusMessage })
      );
  };

  login = (user) => {
    const { username, password } = user;
    auth
      .login({ username, password })
      .then((user) => this.setState({ isLoggedin: true, user: user }))
      .catch((err) => console.log(err));
  };

  // ! Error aqui? "this"
  logout = () => {
    auth
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch((err) => console.log(err));
  };

  getAllUsers = async () => {
    try {
      const theUsers = await profile.getAllUsers();
      return theUsers;
    } catch (error) {}
  };

  getProfile = async (id) => {
    const user = await profile.getProfile(id);
    return user;
  };

  // getUserBookings deberia de ser getUser
  getUserBookings = async () => {
    const bookings = await home.home();
    return bookings;
  };

  getDates = async () => {
    const dates = await booking.getDates();
    return dates;
  };

  makeBooking = async (name, date, hour, participants) => {
    const newBooking = await booking.addBooking(name, date, hour, participants);

    return newBooking;
  };

  editBooking = async (id) => {
    const newBooking = await booking.editBooking(id);
    console.log(id, "this should be the id");
    return newBooking;
  };

  // !
  getBooking = async (id) => {
    const theBooking = await booking.getBooking(id);
    return theBooking;
  };

  getUserGames = async () => {
    const theBookings = await booking.getUserBookings();
    return theBookings;
  };

  addParticipant = async (userID, bookingID) => {
    return await booking.addPlayer(userID, bookingID);
  };

  deleteParticipant = async (playerId, bookingId) => {
    return await booking.deletePlayer({ playerId, bookingId });
  };

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const {
      login,
      logout,
      signup,
      getProfile,
      getAllUsers,
      getUserBookings,
      getDates,
      makeBooking,
      getUserGames,
      editBooking,
      getBooking,
      deleteParticipant,
      addParticipant,
    } = this;

    return isLoading ? (
      <div>Loading</div>
    ) : (
      <Provider
        value={{
          isLoggedin,
          user,
          login,
          logout,
          signup,
          getProfile,
          getAllUsers,
          getUserBookings,
          getDates,
          makeBooking,
          getUserGames,
          editBooking,
          getBooking,
          deleteParticipant,
          addParticipant,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };
export default AuthProvider;
