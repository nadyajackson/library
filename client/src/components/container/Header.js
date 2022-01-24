import { Link } from "react-router-dom";

function Header(){
    return(
        <div>
            <ul id="header">
                <li><Link to ="/">Home</Link> </li>
                <li><Link to ="/Insert">Insert</Link> </li>
            </ul>
        </div>
    )
}

export default Header