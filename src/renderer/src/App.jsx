/* eslint-disable prettier/prettier */
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
import { GlobalContext } from './services/GlobalContext.js';
import PouchDB from "pouchdb/dist/pouchdb";
import LandingPage from './pages/Landing.jsx';
import AutomaticCashier from './pages/automatic_cashier.jsx';
import Stats from './pages/Stats.jsx';



export default function App() {
    let localSessionsDB = new PouchDB('localSessionsDB');


    let [sessionsState, setSessionsState] = useState([]);



    // filtraggio solo delle sessioni di oggi
    // è una pezza momentanea
    // si devono gestire meglio le sessioni
    // succede che quando il server è offline 
    // registra la sessione ma non la chiusura è quindi risulta sempre apera
    // si potrebbe prevedere un filtro giornaliero che cancella tutte le sessioni non valide

    function todayFilter() {

        let res = sessionsState.map(x => {
            let data = new Date(x.doc.open_date);
            let oggi = new Date();

            if (data.getFullYear() >= oggi.getFullYear() && (data.getMonth() + 1) >= (oggi.getMonth() + 1) && data.getDate() >= oggi.getDate()) {
                return x;
            }

        });
        return res;
    }


    useEffect(() => {

        window.api.ipcRenderer.invoke('getHostName').then((host) => {
            console.log('host', host)

            return host
        }).then(host => {

            let dbUrl = `http://admin:admin@${host}:5984/sessions`;

            var remoteSessionsDB = new PouchDB(dbUrl);

            localSessionsDB.allDocs({ include_docs: true }).then(res => {
                const foundSessions = res.rows.map(x => x.doc)
                // setSessionsState(todayFilter(res.rows.filter(x => !x.doc.language)));
                setSessionsState(foundSessions)
            });

            localSessionsDB.replicate.from(remoteSessionsDB, {
                live: true,
                retry: true
            }).on('change', function (change) {

                localSessionsDB.allDocs({ include_docs: true }).then(res => {
                    const foundSessions = res.rows.map(x => x.doc)
                    // setSessionsState(todayFilter(res.rows.filter(x => !x.doc.language)));
                    setSessionsState(foundSessions)
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
        <GlobalContext.Provider value={{
            sessionsState: [sessionsState, setSessionsState]
        }}>
            <Router>
                <Navbar />

                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path='/file_uploader' element={<FileUploader />} />
                    <Route path='/register_user' element={<RegisterUser />} />
                    <Route path='/check_latest_price' element={<Table />} />
                    <Route path='/sessions' element={<Sessions />} />
                    <Route path='/automatic_cashier' element={<AutomaticCashier />} />
                    <Route path='/stats' element={<Stats />} />
                </Routes>
            </Router>
        </GlobalContext.Provider>
    )
}
