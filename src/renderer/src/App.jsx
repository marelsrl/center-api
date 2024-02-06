import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';


//COMPONENTS
import FileUploader from './components/FileUploader';
import Index from './components/Index';
import RegisterUser from './components/RegisterUser';
import CheckLatestPrice from './components/CheckLatestPrice'

export default function ImageUploader() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path='/file_uploader' element={<FileUploader/>}/>
                <Route path='/register_user' element={<RegisterUser/>}/>
                <Route path='/check_latest_price' element={<CheckLatestPrice/>}/>
            </Routes>
        </Router>
    )
}
