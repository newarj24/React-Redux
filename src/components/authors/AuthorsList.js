import React from 'react';
import propTypes from 'prop-types';

const AuthorsList = ({ authors, handleAuthorDelete }) => (
  <div className='jumbotron'>
    <h2 className='text-center mb-5'>Author Details</h2>
    <table className='table table-bordered col-md-6 mx-auto'>
      <thead>
        <tr>
          <th>Author ID</th>
          <th>Author Name</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {authors.map(author => {
          return (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.name}</td>
              <td>
                <button
                  className='btn btn-outline-danger'
                  onClick={() => handleAuthorDelete(author)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

AuthorsList.propTypes = {
  authors: propTypes.array.isRequired,
  handleAuthorDelete: propTypes.func.isRequired
};
export default AuthorsList;
