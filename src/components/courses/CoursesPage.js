import React from "react";

import propTypes from "prop-types";

import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: ""
    }
  };

  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({
      course
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // this.props.dispatch(courseAction.createCourse(this.state.course));
    this.props.action.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>

        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />

        <input type="submit" value="Submit" />

        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

function mapStateToProps(state) {
  // This 'courses' property is derived from Root Reducer
  return {
    courses: state.courses
  };
}

/*
There are several ways to setup mapDispatchToProps :
// 1) Using dispatch
function mapDispatchToProps(dispatch) {
  return {
    // course i.e 'this.state.course' is passed from dispatch inside handleSubmit
    createCourse: course => dispatch(courseAction.createCourse(course))
  };
}

// 2) mapDispatchToProps as an Object : actions as a property
// Each proprty is automatically bound to dispatch

const mapDispatchToProps =  {
    createCourse: courseAction.createCourse
};
*/

// 3) Using bindActionCreators
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(courseAction, dispatch)
  };
}

CoursesPage.propTypes = {
  courses: propTypes.array.isRequired,
  action: propTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
