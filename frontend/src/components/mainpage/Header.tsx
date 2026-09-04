import { Link } from "react-router-dom";

export default function Header(){
    return (
        <header id="header">
            <h1><Link className="nav-link" to="/">GameGrid</Link></h1>
            <nav id="navbar">
                <ul>
                    <li><Link className="nav-link" to="/live-games">Live</Link></li>
                    <li><Link className="nav-link" to="/all-games">Games</Link></li>
                    <li><Link className="nav-link" to="">Teams</Link></li>
                    <li><Link className="nav-link" to="/rankings">Rankings</Link></li>
                    <li><Link className="nav-link" to="">About</Link></li>
                </ul>
                
                <div id="nav-buttons">
                    <button className="login">Log In</button>
                    <button className="sign-up">Sign Up</button>
                </div>
                
            </nav>
        </header>
    )
}