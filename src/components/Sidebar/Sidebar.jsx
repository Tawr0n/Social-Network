import s from './Sidebar.module.css'
import Navigation from "./Navigation/Navigation";
import Friends from "./Friends/Friends";

const Sidebar = ({sidebar}) => {
    return (
        <aside className={s.sidebar}>
            <Navigation />
            <Friends friends={sidebar.friends}/>
        </aside>

    )
}

export default Sidebar
