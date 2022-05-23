import React from 'react';
import classes from "./Profile.module.css";

const Profile = () => {
    return (
        <div className="ProfilePage" className={classes.text}>
            <h1>О Вас:</h1>
            <div className={classes.aboutBlock}>
                <p>Ваше имя:</p>
                <p>Логин:</p>
                <p>Изменить пароль:</p>
            </div>

            <h1>Избранные маршруты:</h1>
            <div>
                <p className={classes.aboutTicket}>Маршрут1</p>
                <p className={classes.aboutTicket}>Маршрут2</p>
                <p className={classes.aboutTicket}>Маршрут3</p>
            </div>
            
        </div>
    );
};

export default Profile;