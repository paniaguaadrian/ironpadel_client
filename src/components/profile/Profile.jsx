import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import editservice from "../../lib/profile-service";

// CSS
import "./Profile.css";
import "../../pages/Home.css";

class Profile extends Component {
  state = {
    user: {},
    username: "",
    description: "",
    image: "",
    email: "",
  };

  getTheUser = async () => {
    const { params } = this.props.match;
    const theUser = await this.props.getProfile(params.id);

    this.setState({
      user: theUser,
      username: theUser.username,
      description: theUser.description,
      image: theUser.image,
      email: theUser.email,
    });
  };

  componentDidMount = () => {
    this.getTheUser();
  };

  // componentDidUpdate(prevProps) {
  //   if (this.match.params.id !== prevProps.match.params.id) {
  //     // call the fetch function again
  //   }
  // }

  handleChange = async (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleFileUpload = async (e) => {
    console.log("the file to be uploaded is: ", e.target.files[0]);

    // creamos un nuevo objeto FormData
    const uploadData = new FormData();

    // imageUrl (este nombre tiene que ser igual que en el modelo, ya que usaremos req.body como argumento del método .create() cuando creemos una nueva movie en la ruta POST '/api/movies/create')
    uploadData.append("image", e.target.files[0]);

    try {
      const res = await editservice.handleUpload(uploadData);

      console.log("response is", res);

      this.setState({ image: res.secure_url });
    } catch (error) {
      console.log("Error while uploading the file: ", error);
    }
  };

  handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const { username, email, description, image } = this.state;
      const { id } = this.props.match.params;
      await editservice.editProfile({
        username,
        email,
        description,
        image,
        id,
      });
      console.log(username, "this is the users name");
      this.setState({
        username: "",
        description: "",
        image: "",
        email: "",
      });
      this.props.history.push("/");
    } catch (error) {
      console.log(error, "the error originated here");
    }
  };

  render() {
    console.log(this.state.user);
    return (
      <div key={window.location.pathname} className="auth_container">
        {this.state.user !== undefined &&
        this.props.user._id == this.state.user._id ? (
          <div className="profile_container">
            <div className="form_container">
              <form onSubmit={this.handleFormSubmit}>
                <div>
                  <img src={this.state.image} alt="" style={{ width: 100 }} />
                </div>

                <input type="file" onChange={(e) => this.handleFileUpload(e)} />
                <div className="form_part">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder={this.state.user.username}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form_part">
                  <label>Email:</label>
                  <input
                    type="text"
                    name="email"
                    // !
                    value={this.state.email}
                    placeholder={this.state.user.email}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form_part">
                  <label>Description:</label>
                  <textarea
                    type="text"
                    name="description"
                    // !
                    value={this.state.description}
                    placeholder={this.state.user.description}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="form_button_container">
                  <input
                    className="form_button_btn"
                    type="submit"
                    value="Edit"
                  />
                </div>
              </form>
            </div>
            <div className="form_container_stats_user">
              <h1>Players Stats:</h1>
              <p>
                Games played: <span>{this.state.user.games}</span>
              </p>
              <p>
                Games won 🎉 : <span>{this.state.user.wins}</span>
              </p>
            </div>

            {this.state.user.achievements
              ? this.state.user.achievements.map((achievement) => {
                  return (
                    <div>
                      <img
                        src={achievement.image}
                        alt=""
                        style={{ width: 100 }}
                      />
                      <h3>{achievement.name}</h3>
                      <p>{achievement.description}</p>
                    </div>
                  );
                })
              : null}
          </div>
        ) : (
          <div className="auth_container_profile">
            <div className="profile_container">
              <div className="form_container_profile">
                <img
                  src={this.state.user.image}
                  alt=""
                  style={{ width: 100 }}
                />
                <h1>{this.state.user.username}</h1>
                <h4>{this.state.user.email}</h4>
                <p>{this.state.user.description}</p>
              </div>
              <div className="form_container_stats">
                <h1>Players Stats:</h1>
                <p>
                  Games played: <span>{this.state.user.games}</span>
                </p>
                <p>
                  Games won 🎉 : <span>{this.state.user.wins}</span>
                </p>
              </div>
            </div>
            <div>
              <h2>Your achievements</h2>
              {this.state.user.achievements
                ? this.state.user.achievements.map((achievement) => {
                    return (
                      <div>
                        <img
                          src={achievement.image}
                          alt=""
                          style={{ width: 100 }}
                        />
                        <h3>{achievement.name}</h3>
                        <p>{achievement.description}</p>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Profile);
