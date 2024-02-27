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
    let localCartDB = new PouchDB('localCartDB');
    var remoteCartDB = new PouchDB('http://admin:admin@SERVER:5984/carts')

    let [cartState, setCartState] = useState([]);


    useEffect(() => {
        localCartDB.replicate.from(remoteCartDB, {
            live: true,
            retry: true
        }).on('change', function (change) {
            
            localCartDB.allDocs({ include_docs: true }).then(res => {
                console.error(res.rows.map(x => x.doc));
                setCartState(res.rows.map(x => x.doc))
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

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path='/file_uploader' element={<FileUploader />} />
                <Route path='/register_user' element={<RegisterUser />} />
                <Route path='/check_latest_price' element={<CheckLatestPrice />} />
                <Route path='/sessions' element={<Sessions cartState={cartState} />} />
            </Routes>
        </Router>
    )
}
