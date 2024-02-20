import ModalWindow from "../components/modalWindow/ModalWindow";
import styles from "./MainPage.module.css";
import { useEffect, useState } from "react";
import data from "../state/dataState";
import { observer } from "mobx-react-lite";
import Aside from "../components/aside/Aside";
import WeatherList from "../components/weatherList/WeatherList";
import CityList from "../components/cityList/CityList";

const MainPage: React.FC = observer(() => {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        data.addTrip("tokyo", "", "");
    }, []);

    console.log(data.tripsList[data.selected]);

    const closeModal = () => {
        setModal(false);
    };

    const openModal = () => {
        setModal((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            {modal && <ModalWindow closeModal={closeModal} />}
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
