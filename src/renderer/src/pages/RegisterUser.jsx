import { Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap'
import React from "react";

import UserModel from "../userModel";

function RegisterUser() {

    let [userData, setUserData] = React.useState(
        {
            name:"",
            email:"",
            password:"",
            alias:"",
            user_group:"",
            employee_id:"",
            is_left_handed:false
        }
    );


    function confirm(){
        const newUser = new UserModel(userData.name,userData.password,userData.alias,userData.email,userData.user_group, userData.employee_id, userData.is_left_handed)
        window.api.addUser(newUser.toJson());     
    }

    return (
        <div id="registerUser">
            <div style={{ width: "50%"}} >
                <Form.Group>
                    <Form.Control value={userData.name} onChange={e=>setUserData({...userData,name:e.target.value})} placeholder="name" type="text"/>
                    <br/>
                    <Form.Control value={userData.email}  onChange={e=>setUserData({...userData,email:e.target.value})}  placeholder="email" type="text"/>
                    <br/>
                    <Form.Control  onChange={e=>setUserData({...userData,password:e.target.value})}  placeholder="password" type="password"/>
                    <br/>
                    <Form.Control  onChange={e=>setUserData({...userData,alias:e.target.value})}  placeholder="alias" type="text"/>
                    <br/>
                    <Form.Control  onChange={e=>setUserData({...userData,user_group:e.target.value})}  placeholder="user_group" type="text"/>
                    <br/>
                    <Form.Control  onChange={e=>setUserData({...userData,employee_id:e.target.value})}  placeholder="employee_id" type="text"/>
                    <br/>
                    <Form.Switch  onChange={()=>setUserData({...userData,is_left_handed:!userData.is_left_handed})}  style={{display:"inline"}}/> <span>Spunta se se mancino</span>
                </Form.Group>
                <br/>
                <button onClick={confirm} className="bg-blue-700 rounded-md p-2 text-white">Conferma</button>
            </div>
        </div>
    )
}



export default RegisterUser;