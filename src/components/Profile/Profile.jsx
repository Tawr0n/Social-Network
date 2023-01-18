import s from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div className={s.main}>
            <div className={s.main__imgBlock}>
                <img
                    src="https://64.media.tumblr.com/e10123b95d3c4fdfc1e5a53beb0be5a7/588aba39c09f8322-a4/s1280x1920/6cc423179fb28e53335c536e5586bdd4543b68f1.jpg"
                    alt=""/>
            </div>
            <div className={'main__profile'}>
                <div className={'main__avatar'}>
                    <img src="src/components/Profile/Profile" alt=""/>
                </div>
                <div className={'main__info'}>
                    <p>Yaroslav Kit</p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <MyPosts/>
        </div>
    )
}

export default Profile
