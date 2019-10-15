import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => (
    <div className="jumbotron">
        <h1>Pluralsight Admin</h1>
        <p>React-Redux</p>

        <Link to="about" className="btn btn-primary btn-lg text-capitalize">
            learn more
        </Link>
    </div>
)

export default Homepage;