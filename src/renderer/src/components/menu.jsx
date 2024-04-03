import MenuButton from "./MenuButton";


function Menu() {

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-around flex-col">
            <ul style={{listStyleType:"circle",textDecoration:"underline"}}>
                <MenuButton title="upload prices" route="/file_uploader"/>
                <br/>
                <MenuButton title="register user" route="/register_user"/>
                <br/>
                <MenuButton title="check latest price" route="/check_latest_price"/>
                <br/>
               <MenuButton title="sessions" route="/sessions" />
            </ul>
        </div>
    )
}

export default Menu;