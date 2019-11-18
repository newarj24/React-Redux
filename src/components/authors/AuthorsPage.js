import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';

import * as authorActions from '../../redux/actions/authorActions';
import * as courseActions from '../../redux/actions/courseActions';
import AuthorsList from './AuthorsList';

function AuthorsPage({ authors, action, loading, courses }) {
  const [authorList, setAuthors] = useState(authors);
  const [coursesList, setCourses] = useState(courses);

  useEffect(() => {
    if (authors.length === 0) {
      action.loadAuthors().catch(error => {
        alert('Loading authors Failed!!' + error);
      });
    } else {
      setAuthors(authors);
    }

    if (courses.length === 0) {
      action.loadCourses().catch(error => {
        alert('Loading Courses failed!!' + error);
      });
    } else {
      setCourses(courses);
    }
  }, [authors]);

  function handleAuthorDelete(author) {
    let isPerformDelete = courses.find(course => course.authorId == author.id);

    if (!isPerformDelete) {
      const newAuthor = authorList.filter(
        authorDetail => authorDetail.id != author.id
      );

      setAuthors(newAuthor);
      toast.success('Author Deleted');
    } else {
      toast.warn('Author has course');
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <AuthorsList authors={authorList} handleAuthorDelete={handleAuthorDelete} />
  );
}

function mapStateToProps(state) {
  const authors = state.authors;
  const courses = state.courses;

  return {
    authors,
    courses,
    loading: state.apiCallsInProgess > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch)
    }
  };
}

AuthorsPage.propTypes = {
  authors: propTypes.array.isRequired,
  action: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired,
  courses: propTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
