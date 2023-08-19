import { Link } from "react-router-dom";

const homePage = () => {
    return (
        <div>
        <img style={{width: "100%", height: "100%", position: "absolute"}} src="/Images/NoteMakers.png" alt="no img"/>
        <div className='side_navbar1'>
            <img style={{width: "100px", height: "100px", marginBottom: "100px"}} src={'/Images/logo.png'} alt="no img"/>
            

            {sessionStorage.getItem('userData')?<Link to={'/Notes'}>
                    <button className="createButton"> Add Notes</button>
                </Link>:<><Link className='profile' to={'/login'}>
                    <button className="navItems1">Log in</button>
                </Link>
                <Link className='profile' to={'/Signup'}>
                    <button className="navItems1">Sign up</button>
                </Link></>}
                
                <Link className='profile' to={'/AppPage'}>
                    <button className="navItems1">App</button>
                </Link>
                <Link className='profile' to={'/about'}>
                    <button className="navItems1">About</button>
                </Link>
            </div>
        </div>

        
    )
}

export default homePage;

