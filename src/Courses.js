import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner, Card, Form } from "react-bootstrap";
import "./css/Courses.css";

import axios from "axios";
import CoursePageModal from "./components/CoursePageModal";

class Courses extends Component {
  state = {
    allCourses: [],
    userCourses: [],
    err: "",
    // for select 3 filterations:
    filterdCourses: [],
    levelFilterdCourses: [],
    durationFilterdCourses: [],
    skillsFilterdCourses: [],
    levelValue: "all",
    durationValue: "all",
    skillsValue: "all",
    // end of select 3 filterations
    searchValue: "",
    // offcanvas:
    showModal: false,
    modalData: {},
    showEnrollbtn: ["a"],
  };

  componentDidMount() {
    const serverUrl = process.env.REACT_APP_SERVER;
    const url = `${serverUrl}/allcourses`;

    axios
      .get(url)
      .then((response) => {
        this.setState({
          allCourses: response.data,
          filterdCourses: response.data,
        });
      })
      .catch((err) => {
        this.setState({ err: "There is and error" });
      });
  }

  // start of 3 select filteration functions
  levelFilter = (e) => {
    this.setState({ levelValue: e.target.value, searchValue: "" });
    let levelValue = e.target.value;

    if (
      levelValue !== "all" &&
      this.state.durationValue === "all" &&
      this.state.skillsValue === "all"
    ) {
      let newdata = this.state.allCourses.filter((course) => {
        return e.target.value === course.level;
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ levelFilterdCourses: newdata });
    } else if (
      levelValue !== "all" &&
      this.state.skillsValue === "all" &&
      this.state.durationValue !== "all"
    ) {
      let newdata = this.state.durationFilterdCourses.filter((course) => {
        return e.target.value === course.level;
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ levelFilterdCourses: newdata });
    } else if (
      levelValue !== "all" &&
      this.state.skillsValue !== "all" &&
      this.state.durationValue === "all"
    ) {
      let newdata = this.state.skillsFilterdCourses.filter((course) => {
        return e.target.value === course.level;
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ levelFilterdCourses: newdata });
    } else if (
      levelValue !== "all" &&
      this.state.skillsValue !== "all" &&
      this.state.durationValue !== "all"
    ) {
      let newdata = this.state.filterdCourses.filter((course) => {
        return e.target.value === course.level;
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ levelFilterdCourses: newdata });
    } else {
      if (
        this.state.durationValue !== "all" &&
        this.state.skillsValue === "all"
      ) {
        this.setState({ filterdCourses: this.state.durationFilterdCourses });
      } else if (
        this.state.skillsValue !== "all" &&
        this.state.durationValue === "all"
      ) {
        this.setState({ filterdCourses: this.state.skillsFilterdCourses });
      } else if (
        this.state.durationValue !== "all" &&
        this.state.skillsValue !== "all"
      ) {
        this.setState({ filterdCourses: this.state.skillsFilterdCourses });
      } else {
        this.setState({ filterdCourses: this.state.allCourses });
      }
    }
  };

  durationFilter = (e) => {
    this.setState({ durationValue: e.target.value, searchValue: "" });
    let durationValue = e.target.value;

    if (
      durationValue !== "all" &&
      this.state.levelValue === "all" &&
      this.state.skillsValue === "all"
    ) {
      let newdata = this.state.allCourses.filter((course) => {
        let number = parseInt(course.duration);
        if (e.target.value === "above") {
          return number >= 4;
        } else {
          return number < 4;
        }
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ durationFilterdCourses: newdata });
    } else if (
      durationValue !== "all" &&
      this.state.skillsValue === "all" &&
      this.state.levelValue !== "all"
    ) {
      let newdata = this.state.levelFilterdCourses.filter((course) => {
        let number = parseInt(course.duration);
        if (e.target.value === "above") {
          return number >= 4;
        } else {
          return number < 4;
        }
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ durationFilterdCourses: newdata });
    } else if (
      durationValue !== "all" &&
      this.state.skillsValue !== "all" &&
      this.state.levelValue === "all"
    ) {
      let newdata = this.state.skillsFilterdCourses.filter((course) => {
        let number = parseInt(course.duration);
        if (e.target.value === "above") {
          return number >= 4;
        } else {
          return number < 4;
        }
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ durationFilterdCourses: newdata });
    } else if (
      durationValue !== "all" &&
      this.state.skillsValue !== "all" &&
      this.state.levelValue !== "all"
    ) {
      let newdata = this.state.filterdCourses.filter((course) => {
        let number = parseInt(course.duration);
        if (e.target.value === "above") {
          return number >= 4;
        } else {
          return number < 4;
        }
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ durationFilterdCourses: newdata });
    } else {
      if (this.state.levelValue !== "all" && this.state.skillsValue === "all") {
        this.setState({ filterdCourses: this.state.levelFilterdCourses });
      } else if (this.state.skillsValue !== "all") {
        this.setState({ filterdCourses: this.state.skillsFilterdCourses });
      } else if (
        this.state.levelValue !== "all" &&
        this.state.skillsValue !== "all"
      ) {
        this.setState({ filterdCourses: this.state.skillsFilterdCourses });
      } else {
        this.setState({ filterdCourses: this.state.allCourses });
      }
    }
  };

  skillsFilter = (e) => {
    this.setState({ skillsValue: e.target.value, searchValue: "" });
    let skillsValue = e.target.value;

    if (
      skillsValue !== "all" &&
      this.state.levelValue === "all" &&
      this.state.durationValue === "all"
    ) {
      const Regex = new RegExp(e.target.value, "g");
      let newdata = this.state.allCourses.filter((course) => {
        if (course.skills) {
          let newskills = course.skills.map((skill) => {
            return skill.toLowerCase();
          });
          return Regex.test(newskills);
        }
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ skillsFilterdCourses: newdata });
    } else if (
      skillsValue !== "all" &&
      this.state.durationValue === "all" &&
      this.state.levelValue !== "all"
    ) {
      const Regex = new RegExp(e.target.value, "g");
      let newdata = this.state.levelFilterdCourses.filter((course) => {
        if (course.skills) {
          let newskills = course.skills.map((skill) => {
            return skill.toLowerCase();
          });
          return Regex.test(newskills);
        }
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ skillsFilterdCourses: newdata });
    } else if (
      skillsValue !== "all" &&
      this.state.durationValue !== "all" &&
      this.state.levelValue === "all"
    ) {
      const Regex = new RegExp(e.target.value, "g");
      let newdata = this.state.durationFilterdCourses.filter((course) => {
        if (course.skills) {
          let newskills = course.skills.map((skill) => {
            return skill.toLowerCase();
          });
          return Regex.test(newskills);
        }
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ skillsFilterdCourses: newdata });
    } else if (
      skillsValue !== "all" &&
      this.state.durationValue !== "all" &&
      this.state.levelValue !== "all"
    ) {
      const Regex = new RegExp(e.target.value, "g");
      let newdata = this.state.filterdCourses.filter((course) => {
        if (course.skills) {
          let newskills = course.skills.map((skill) => {
            return skill.toLowerCase();
          });
          return Regex.test(newskills);
        }
      });
      this.setState({ filterdCourses: newdata });
      this.setState({ skillsFilterdCourses: newdata });
    } else {
      if (
        this.state.levelValue !== "all" &&
        this.state.durationValue === "all"
      ) {
        this.setState({ filterdCourses: this.state.levelFilterdCourses });
      } else if (
        this.state.durationValue !== "all" &&
        this.state.levelValue === "all"
      ) {
        this.setState({ filterdCourses: this.state.durationFilterdCourses });
      } else if (
        this.state.levelValue !== "all" &&
        this.state.durationValue !== "all"
      ) {
        this.setState({ filterdCourses: this.state.durationFilterdCourses });
      } else {
        this.setState({ filterdCourses: this.state.allCourses });
      }
    }
  };
  // end of 3 select filteration functions

  // start of search input function
  searchFilter = (e) => {
    e.preventDefault();
    let value = e.target.searchValue.value.toLowerCase();

    const Regex = new RegExp(value, "g");

    let newdata = this.state.allCourses.filter((course) => {
      return Regex.test(course.title.toLowerCase());
    });
    this.setState({ filterdCourses: newdata });
  };

  searchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  // end of search input function

  // start of canvas functions
  handleShow = async (i) => {
    this.setState({ showModal: true, modalData: this.state.allCourses[i] });

    if (this.props.isAuth) {
      console.log("here");
      const serverUrl = process.env.REACT_APP_SERVER;
      const url2 = `${serverUrl}/getusercourses?email=${this.props.user.email}`;
      await axios
        .get(url2)
        .then((response) => {
          this.setState({ userCourses: response.data });
        })
        .catch((err) => {
          this.setState({ err: "There is and error" });
        });
    }

    let arr = this.state.userCourses.filter((course) => {
      return course.title === this.state.allCourses[i].title;
    });

    console.log(this.state.userCourses);

    this.setState({ showEnrollbtn: arr });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleEnroll = () => {
    this.setState({ showModal: false });

    // send request to add users course database
    const serverUrl = process.env.REACT_APP_SERVER;
    const url = `${serverUrl}/addusercourse`;
    const url2 = `${serverUrl}/updateCourseEnrollCount`;

    let dataObj = {
      email: this.props.user.email,
      title: this.state.modalData.title,
      img: this.state.modalData.image,
      subtitle: this.state.modalData.subtitle,
    };

    axios
      .post(url, dataObj)
      .then((response) => {
        this.setState({ userCourses: response.data });

        axios
          .put(url2, { title: this.state.modalData.title })
          .then((response) => {
            this.setState({
              allCourses: response.data,
            });
          })
          .catch((err) => {
            this.setState({ err: "There is and error" });
          });
      })
      .catch((err) => {
        this.setState({ err: "There is and error" });
      });
  };
  // end of canvas functions

  render() {
    return (
      <div>
        <div className="search-container">
          <Form onSubmit={this.searchFilter}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="d-block">Search Courses</Form.Label>
              <Form.Control
                type="text"
                placeholder="What you want to learn"
                className="course-search-input"
                name="searchValue"
                value={this.state.searchValue}
                onChange={this.searchChange}
              />
              <input
                type="submit"
                value="Search"
                className="course-search-btn btn btn-success"
              />
            </Form.Group>
          </Form>
          <div className="select-container">
            <Form.Group controlId="exampleForm.SelectCustom1">
              <Form.Label>Level</Form.Label>
              <Form.Control
                as="select"
                name="level"
                onChange={this.levelFilter}
              >
                <option value="all">All</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom2">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                as="select"
                name="duration"
                onChange={this.durationFilter}
              >
                <option value="all">All</option>
                <option value="above"> {">= month"} </option>
                <option value="less">{"< month"}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom3">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                as="select"
                name="skills"
                onChange={this.skillsFilter}
              >
                <option value="all">All</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="jquery">jQuery</option>
                <option value="ruby">Ruby</option>
                <option value="heroku">Heroku</option>
                <option value="linux">Linux</option>
                <option value="networking">Networking</option>
                <option value="python">HTTP</option>
              </Form.Control>
            </Form.Group>
          </div>
          <p>Courses ({this.state.filterdCourses.length} results)</p>
        </div>
        <div className="course-cards">
          {this.state.allCourses.length === 0 ? (
            <>
              <Spinner animation="border" variant="success" />
              <p style={{ color: "green" }}>Loading...</p>
            </>
          ) : (
            this.state.filterdCourses.map((course, i) => {
              return (
                <Card
                  className="course-card"
                  key={i}
                  onClick={() => this.handleShow(i)}
                >
                  <Card.Img
                    variant="top"
                    src={course.image}
                    style={{ height: 160 }}
                  />
                  <Card.Body>
                    <Card.Title className="pb-2">{course.title}</Card.Title>
                    <Card.Text>{course.subtitle}</Card.Text>
                    <Card.Text>{course.level}</Card.Text>
                    <Card.Text>{course.duration}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          )}
        </div>
        {/* modal component */}
        <CoursePageModal
          show={this.state.showModal}
          closeFunc={this.handleClose}
          EnrollFunc={this.handleEnroll}
          data={this.state.modalData}
          showEnrollbtn={this.state.showEnrollbtn}
          isAuth={this.props.isAuth}
        />
      </div>
    );
  }
}

export default Courses;
