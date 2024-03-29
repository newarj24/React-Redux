import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseList = ({
  courses,
  onDeleteClick,
  currentPage,
  coursesPerPage
}) => {
  const courseList = [];

  for (
    let course = (currentPage - 1) * coursesPerPage;
    course < currentPage * coursesPerPage && course < courses.length;
    course++
  ) {
    courseList.push(courses[course]);
  }

  return (
    <React.Fragment>
      <div>
        <button className="course-count btn mr-4 mb-3 float-right">
          <strong>{courses.length}</strong>{' '}
          {courses.length > 1 ? 'Courses' : 'Course'}
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {courseList.map(course => {
            return (
              <tr key={course.id}>
                <td>
                  <a
                    className="btn btn-light"
                    href={'http://pluralsight.com/courses/' + course.slug}
                  >
                    Watch
                  </a>
                </td>
                <td>
                  <Link to={'/course/' + course.slug}>{course.title}</Link>
                </td>
                <td>{course.authorName}</td>
                <td>{course.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDeleteClick(course)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  coursesPerPage: PropTypes.number.isRequired
};

export default CourseList;
