import { Button, Form } from 'react-bootstrap'
import React, { useState } from "react";

import UserModel from "../userModel";

import ContentModal from '../components/ContemtModal';

function RegisterUser() {


    let [isPassword, setIsPassword] = useState(true);
    let [loading, setLoading] = useState(false);
    let [modalData, setModalData] = useState({
        visible:false,
        content:null
    })

    let [userData, setUserData] = React.useState(
        {
            name: "",
            email: "",
            password: "",
            alias: "",
            user_group: "",
            employee_id: "",
            is_left_handed: false
        }
    );



    function confirm() {
        setLoading(true);
        const newUser = new UserModel(userData.name, userData.password, userData.alias, userData.email, userData.user_group, userData.employee_id, userData.is_left_handed)
        
        let requireds = ["name","password","alias","user_group","employee_id"]

        for(let required of requireds){
            if(!userData[required]){
                setModalData({
                    visible:true,
                    content:()=><p>Manca {required} 🚫</p>
                })
                setLoading(false)
                return;
            }
            
        }

        if(userData.password.length < 8){

            
            setModalData({
                visible:true,
                content:()=><p>La password deve essere lunga almeno 8 caratteri 🚫</p>
            })
            setLoading(false)
            return
        }
        
        window.api.addUser(newUser.toJson()).then(res => {
            console.log(res)
            if(res.status === "success"){
                setModalData({
                    visible:true,
                    content:()=><p>Utente aggiunto con successo ✅</p>
                })
            }else{
                setModalData({
                    visible:true,
                    content:()=><p>Errore durante la registrazione dell'utente {res?.message} 🚫</p>
                })
            }
           }).catch(err => {
            
            setModalData({
                visible:true,
                content:()=><p>Errore durante la registrazione dell'utente {err?.message} 🚫</p>
            })
        }).finally(()=>{
            setLoading(false);
        })
        
    }

    return (
        <div id="registerUser">
            <div style={{ width: "50%" }} >
                <Form.Group>
                    <Form.Control disabled={loading} value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} placeholder="name" type="text" />
                    <br />
                    <Form.Control  disabled={loading}  value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder="email" type="text" />
                    <br />
                    <div className="flex items-center">
                        <Form.Control  disabled={loading}   onChange={e => setUserData({ ...userData, password: e.target.value })} placeholder="password" type={isPassword ? "password" :"text"}/>

                       <span  onClick={()=>setIsPassword(old=>!old)} className='pl-3 cursor-pointer'> {
                            isPassword ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                </svg>

                        }
                        </span>
                    </div>
                    <br />
                    <Form.Control  disabled={loading}  onChange={e => setUserData({ ...userData, alias: e.target.value })} placeholder="alias" type="text" />
                    <br />
                    <Form.Control  disabled={loading}  onChange={e => setUserData({ ...userData, user_group: e.target.value })} placeholder="user_group" type="text" />
                    <br />
                    <Form.Control  disabled={loading}  onChange={e => setUserData({ ...userData, employee_id: e.target.value })} placeholder="employee_id" type="text" />
                    <br />
                    <Form.Switch  disabled={loading}  onChange={() => setUserData({ ...userData, is_left_handed: !userData.is_left_handed })} style={{ display: "inline" }} /> <span>Spunta se mancino</span>
                </Form.Group>
                <br />
                <Button   disabled={loading}  onClick={confirm} className="bg-green-700 rounded-md p-2 text-white">Conferma</Button>
            </div>
            <ContentModal visible={modalData.visible} content={modalData?.content} closeModal={()=>setModalData({...modalData, visible:false})}/>
        </div>
    )
}



export default RegisterUser;