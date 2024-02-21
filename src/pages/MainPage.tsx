import ModalWindow from "../components/modalWindow/ModalWindow";
import styles from "./MainPage.module.css";
import { useCallback, useEffect, useState } from "react";
import data from "../state/dataState";
import { observer } from "mobx-react-lite";
import Aside from "../components/aside/Aside";
import WeatherList from "../components/weatherList/WeatherList";
import CityList from "../components/cityList/CityList";
import AuthWindow from "../components/AuthWindow/AuthWindow";

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
            <div
                className={styles.login}
                onClick={() => setAuthOpen((prev) => !prev)}
            >
                &#128039;
            </div>
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
