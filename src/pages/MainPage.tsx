import ModalWindow from "../blocks/modalWindow/ModalWindow";
import styles from "./MainPage.module.css";
import { useCallback, useEffect, useState } from "react";
import data from "../state/dataState";
import { observer } from "mobx-react-lite";
import Aside from "../blocks/aside/Aside";
import WeatherList from "../blocks/weatherList/WeatherList";
import CityList from "../blocks/cityList/CityList";
import AuthWindow from "../blocks/AuthWindow/AuthWindow";
import user from "../state/userState";

const MainPage: React.FC = observer(() => {
    const [modal, setModal] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);

    useEffect(() => {
        data.addTrip(
            "tokyo",
            new Date(new Date().setDate(new Date().getDate() + 5))
                .toISOString()
                .slice(0, 10),
            ""
        );
    }, []);

    const closeModal = useCallback(() => {
        setModal(false);
    }, [modal]);

    const openModal = useCallback(() => {
        setModal((prev) => !prev);
    }, [modal]);

    const closeAuth = () => {
        setAuthOpen(false);
    };

    return (
        <div className={styles.container}>
            {modal && <ModalWindow closeModal={closeModal} />}
            {authOpen && <AuthWindow closeAuth={closeAuth} />}
            {!user.isAuth && (
                <div
                    className={styles.login}
                    onClick={() => setAuthOpen((prev) => !prev)}
                >
                    &#128039;
                </div>
            )}
            {user.isAuth && (
                <div className={styles.isAuth}>
                    <div className={styles.innerAuth}>
                        <div className={styles.userName}>
                            {user.userName.toUpperCase()}
                        </div>
                        <div className={styles.userAvatar}>
                            {user.userName[0].toUpperCase()}
                        </div>
                    </div>
                    <div className={styles.logout} onClick={() => user.logout()}>
                        Logout<div></div>
                    </div>
                </div>
            )}
            <main className={styles.mainSection}>
                <div>
                    <p>
                        Weather <strong>Forecast</strong>
                    </p>
                </div>
                <CityList openModal={openModal} />

                <p>Week</p>
                <WeatherList />
            </main>
            <Aside />
        </div>
    );
});

export default MainPage;
