import { Deadlines } from '../../modules/Deadlines';
import { FocusToday } from '../../modules/FocusToday';
import './MainPage.css'

function MainPage() {
    return ( 
        <main className="main-page">
            <Deadlines/>
            <FocusToday/>
        </main>
     );
}

export default MainPage;