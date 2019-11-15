import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';

import * as authorActions from '../../redux/actions/authorActions';
import AuthorsList from './AuthorsList';

function AuthorsPage({ authors, action, loading }) {
  const [authorList, setAuthors] = useState(authors);

  useEffect(() => {
    if (authors.length === 0) {
      action.loadAuthors().catch(error => {
        alert('Loading authors Failed!!' + error);
      });
    }
  }, [authors]);

  function handleAuthorDelete(author) {
    const newAuthor = authors.filter(
      authorDetail => authorDetail.id != author.id
    );

    console.log(newAuthor);
    setAuthors(newAuthor);
    toast.success('Author Deleted');
  }

  return loading ? (
    <Spinner />
  ) : (
    <AuthorsList authors={authors} handleAuthorDelete={handleAuthorDelete} />
  );
}

function mapStateToProps(state) {
  const authors = state.authors;

  return {
    authors,
    loading: state.apiCallsInProgess > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

AuthorsPage.propTypes = {
  authors: propTypes.array.isRequired,
  action: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
