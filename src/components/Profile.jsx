const Profile = () => {
    return (
        <main className={'main'}>
            <div className={'main__imgBlock'}>
                <img
                    src="https://64.media.tumblr.com/e10123b95d3c4fdfc1e5a53beb0be5a7/588aba39c09f8322-a4/s1280x1920/6cc423179fb28e53335c536e5586bdd4543b68f1.jpg"
                    alt=""/>
            </div>
            <div className={'main__profile'}>
                <div className={'main__avatar'}>
                    <img src="" alt=""/>
                </div>
                <div className={'main__info'}>
                    <p>Yaroslav Kit</p>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div className={'main__posts post'}>
                    <h2 className={'post__title'}></h2>
                    <textarea className={'post__input'} placeholder={'Введіть текст...'} name="" id="" cols="30" rows="10" ></textarea>
                    <button className={'post__button'}>Відправити</button>
                    <div className={'post__1'}>
                        <div className={'post__img'}>
                            <img src="" alt=""/>
                        </div>
                        <div className={'post__text'}>Harry Potter</div>
                    </div>
                    <div className={'post__2'}>
                        <div className={'post__img'}>
                            <img src="" alt=""/>
                        </div>
                        <div className={'post__text'}>Hermione Granger</div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Profile
