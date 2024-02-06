import { Link } from "react-router-dom";
function Index() {

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center">
            <ul style={{listStyleType:"circle",textDecoration:"underline"}}>
                <Link to="/file_uploader">
                    <li >upload prices</li>
                </Link>
                <br/>
                <Link to="/register_user">
                    <li>register user</li>
                </Link>
                <br/>
                <Link to="/check_latest_price">
                    <li>check latest price</li>
                </Link>
            </ul>
        </div>
    )
}

export default Index;