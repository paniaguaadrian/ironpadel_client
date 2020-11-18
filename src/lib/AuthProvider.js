// ! Lo primero que nos encontramos despues de enlazar el back con el front

// ! Crea metodos y estados para los demaas components de nuestro front

import React from "react";

// Llamadas axios a la API
import auth from "./auth-service";
import community from "./community-service";
import court from "./court-service";
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
          {({ login, signup, user, logout, isLoggedin, getProfile, getAllUsers }) => {
            return (
              <WrappedComponent
                login={login}
                signup={signup}
                user={user}
                logout={logout}
                isLoggedin={isLoggedin}
                getProfile={getProfile}
                getAllUsers={getAllUsers}
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
    isLoading: true };

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
    const { username, password } = user;

    auth
      .signup({ username, password })
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

  getAllUsers = async() => {
    try {
      const theUsers = await profile.getAllUsers()
      return theUsers
    } catch (error) {
      
    }
}

  getProfile = async(id) => {
   const user = await profile.getProfile(id)
   return user
  }


  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { login, logout, signup, getProfile, getAllUsers } = this;

    return isLoading ? (
      <div>Loading</div>
    ) : (
      <Provider value={{ isLoggedin, user, login, logout, signup, getProfile, getAllUsers }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };
export default AuthProvider;
