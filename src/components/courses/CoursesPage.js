import React from "react";
import CourseList from "./CourseList";

import propTypes from "prop-types";

import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.action.loadCourses().catch(error => {
      alert("Loading course failed!!", error);
    });
  }

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
      <>
        <CourseList courses={this.props.courses} />
      </>
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
