import styles from "./WeatherList.module.css";
import data from "../../state/dataState";
import { observer } from "mobx-react-lite";

const WeatherList: React.FC = observer(() => {

    const weatherIcons: any = {
        "partly-cloudy-day": "🌤️",
        "partly-cloudy-night": "🌤️",
        fog: '🌤️',
        wind: '🌤️',
        rain: "🌧️",
        cloudy: "☁️",
        snow: "❄️",
        "clear-day": "☀️",
        'clear-night' : '☀️'
    };

    const weekDays: any = {
        0: "Sunday",
        1: "Mondey",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    };

    return (
        <div className={styles.weatherList}>
            {data.tripsList[data.selected]?.days?.map((i: any) => {
                    return (
                        <div key={i.datetime}>
                            <div>
                                {i.datetime.split("-").reverse().join(".")}
                            </div>
                            <div>{weekDays[new Date(i.datetime).getDay()]}</div>
                            <div className={styles.weatherIcon}>
                                {weatherIcons[i.icon]}
                            </div>
                            <div>
                                {(((i.tempmin - 32) * 5) / 9).toFixed() +
                                    "°" +
                                    "/" +
                                    (((i.tempmax - 32) * 5) / 9).toFixed() +
                                    "°"}
                            </div>
                        </div>
                    );
            })}
        </div>
    );
});

export default WeatherList;
