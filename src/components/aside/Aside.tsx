import styles from "./Aside.module.css";
import data from "../../state/dataState";
import {observer} from 'mobx-react-lite'

const Aside: React.FC = observer(() => {
  const weatherIcons: any = {
    "partly-cloudy-day": "🌤",
    "partly-cloudy-night": '🌤',
    'rain': "🌧",
    'cloudy': "☁",
    'snow': "❄",
    "clear-day": "☀",
  };

  const weekDays: any = {
    0: 'Sunday',
    1: 'Mondey',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

  return (
    <aside className={styles.asideSection}>
      <div className={styles.day}>{weekDays[new Date(data.tripsList[data.selected]?.currentConditions?.datetime).getDay()]}</div>
      <div>
        <span className={styles.weatherIcon}>
          {weatherIcons[data.tripsList[data.selected]?.currentConditions?.icon]}
        </span>
        <span className={styles.temp}>
          {(((data.tripsList[data.selected]?.currentConditions?.temp - 32) * 5) / 9).toFixed()}
          <span>&#8451;</span>
        </span>
      </div>
      <div className={styles.city}>{data.tripsList[data.selected]?.resolvedAddress}</div>
    </aside>
  );
});

export default Aside;
