import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


// PAGES
import FileUploader from './pages/FileUploader.jsx';
import RegisterUser from './pages/RegisterUser.jsx';
import Sessions from './pages/Sessions.jsx';
import Table from './pages/PriceList.jsx';

// components
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';


// services
import { GlobalContext } from './serices/GlobalContext.js';
import PouchDB from "pouchdb/dist/pouchdb";
import LandingPage from './pages/Landing.jsx';



export default function App() {
    let localSessionsDB = new PouchDB('localSessionsDB');
    var remoteSessionsDB = new PouchDB('http://admin:admin@SERVER:5984/sessions');

    let [sessionsState, setSessionsState] = useState([]);


    useEffect(() => {

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

    }, [])

    useEffect(() => {
        console.log(sessionsState);
    }, [sessionsState]);

    return (
        <GlobalContext.Provider value={{
            sessionsState
        }}>
            <Router>
                <Navbar/>

                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path='/file_uploader' element={<FileUploader />} />
                    <Route path='/register_user' element={<RegisterUser />} />
                    <Route path='/check_latest_price' element={<Table />} />
                    <Route path='/sessions' element={<Sessions/>} />
                </Routes>
            </Router>
        </GlobalContext.Provider>
    )
}
