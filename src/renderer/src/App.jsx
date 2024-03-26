/* eslint-disable prettier/prettier */
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


// PAGES
import FileUploader from './pages/FileUploader.jsx';
import RegisterUser from './pages/RegisterUser.jsx';
import CheckLatestPrice from './pages/PriceList.jsx';
import Sessions from './pages/Sessions.jsx';

// components
import Menu from './components/menu.jsx';
import { useEffect, useState } from 'react';
import PouchDB from "pouchdb/dist/pouchdb";


export default function App() {
    let localSessionsDB = new PouchDB('localSessionsDB');
    

    let [sessionsState, setSessionsState] = useState([]);
    

   



    useEffect(() => {


        window.api.ipcRenderer.invoke('getHostName').then((host)=>{
            console.log('host', host)
            
            return host
        }).then(host=>{

            let dbUrl = `http://admin:admin@${host}:5984/sessions`;
    
            var remoteSessionsDB=new PouchDB(dbUrl);

            localSessionsDB.allDocs({ include_docs: true }).then(res => {
                console.error(res.rows.map(x => x.doc));
                setSessionsState(res.rows.filter(x => !x.doc.language));
            });
            
            localSessionsDB.replicate.from(remoteSessionsDB, {
                live: true,
                retry: true
            }).on('change', function (change) {
    
                localSessionsDB.allDocs({ include_docs: true }).then(res => {
                    console.error(res.rows.map(x => x.doc));
                    setSessionsState(res.rows.filter(x => !x.doc.language));
                })
    
            }).on('paused', function (info) {
                console.log('replication was paused, usually because of a lost connection', info)
            }).on('active', function (info) {
                console.log('// replication was resumed', info)
            }).on('error', function (err) {
                console.log(err);
                // reject(err)
            });

        })

        

    }, [])

    useEffect(() => {
        console.log(sessionsState);
    }, [sessionsState]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path='/file_uploader' element={<FileUploader />} />
                <Route path='/register_user' element={<RegisterUser />} />
                <Route path='/check_latest_price' element={<CheckLatestPrice />} />
                <Route path='/sessions' element={<Sessions sessionsState={sessionsState} />} />
            </Routes>
        </Router>
    )
}
