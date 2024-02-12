import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';


// PAGES
import FileUploader from './pages/FileUploader.jsx';
import RegisterUser from './pages/RegisterUser.jsx';
import CheckLatestPrice from './pages/PriceList.jsx';
import Sessions from './pages/Sessions.jsx';

// components
import Menu from './components/menu.jsx';


export default function ImageUploader() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Menu/>}/>
                <Route path='/file_uploader' element={<FileUploader/>}/>
                <Route path='/register_user' element={<RegisterUser/>}/>
                <Route path='/check_latest_price' element={<CheckLatestPrice/>}/>
                <Route path='/sessions' element={<Sessions/>}/>
            </Routes>
        </Router>
    )
}
