import React from 'react';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';

import propTypes from 'prop-types';

import { connect } from 'react-redux';
import * as courseAction from '../../redux/actions/courseActions';
import * as authorAction from '../../redux/actions/authorActions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, action } = this.props;

    if (courses.length === 0) {
      action.loadCourses().catch(error => {
        alert('Loading course failed!!', error);
      });
    }

    if (authors.length === 0) {
      action.loadAuthors().catch(error => {
        alert('Loading Authors failed!!', error);
      });
    }
  }

  handleDeleteCourse = course => {
    toast.success('Course Deleted');
    this.props.action.deleteCourse(course).catch(error => {
      toast.error('Delete Failed.' + error.message, { autoClose: false });
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <Link to='course' className='btn btn-primary mb-5 mt-2'>
              Add Course
            </Link>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  // This 'courses' property is derived from Root Reducer
  return {
    courses:
      state.authors.length === 0 // author and courses data fetched in Asynchronous way
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgess > 0
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
    action: {
      loadCourses: bindActionCreators(courseAction.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseAction.deleteCourse, dispatch)
    }
  };
}

CoursesPage.propTypes = {
  courses: propTypes.array.isRequired,
  authors: propTypes.array.isRequired,
  action: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
