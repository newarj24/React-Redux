import React, { useEffect, useState } from 'react';

import propTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PageNotFound from '../PageNotFound';

import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  loading,
  displayCourse,
  ...props
}) {
  // Above line will create an issue : formfield will not populate the result after the reloading the edit course
  // as data is not available while page is rendering
  // We can solve this by tweaking useEffect
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert('Loading courses failed!!', error);
      });
    } else {
      setCourse({
        ...props.course
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert('Loading authors failed!!', error);
      });
    }
  }, [props.course]);

  function isFormValidated() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = 'Title is required.';
    if (!authorId) errors.authorId = 'AuthorId is required.';
    if (!category) errors.category = 'Category is required.';

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    if (!isFormValidated()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success('Course Saved');
        history.push('/courses');
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message }); // Server Side validation - onSave because in CourseForm component, it will look for errors.onSave
      }); // saveCourse is this.props.saveCourse getting from function argument not the imported one.
  }

  // Loading needs to finish before
  return loading ? (
    <Spinner />
  ) : (
    <>
      {displayCourse ? (
        <CourseForm
          course={course}
          errors={errors}
          authors={authors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      ) : (
        <PageNotFound />
      )}
    </>
  );
}

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  let displayCourse;

  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  if (slug && state.courses.length > 0) {
    displayCourse = getCourseBySlug(state.courses, slug) ? true : false;
  }

  return {
    course,
    displayCourse,
    courses: state.courses,
    authors: state.authors,
    loading: state.apiCallsInProgess > 0
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

ManageCoursePage.propTypes = {
  course: propTypes.object.isRequired,
  courses: propTypes.array.isRequired,
  authors: propTypes.array.isRequired,
  loadCourses: propTypes.func.isRequired,
  loadAuthors: propTypes.func.isRequired,
  saveCourse: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired,
  displayCourse: propTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
