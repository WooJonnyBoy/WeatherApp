import { useState } from "react";
import styles from "./ModalWindow.module.css";
import data from "../../state/dataState";

interface Ifc {
    closeModal: () => void;
}

const ModalWindow: React.FC<Ifc> = ({ closeModal }) => {
    const [location, setLocation] = useState<string>("");
    const [date_1, setDate_1] = useState<string>("");
    const [date_2, setDate_2] = useState<string>("");

    const addTrip = () => {
        if (!location.length) return;
        data.addTrip(location, date_1, date_2);
    };

    return (
        <div className={styles.modalWindow}>
            <div className={styles.header}>
                <h3>Create trip</h3>
                <span onClick={() => closeModal()}>✖</span>
            </div>
            <hr />
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="city">
                    <p>
                        <span>*</span> City
                    </p>
                    <input
                        className={styles.input}
                        autoFocus
                        type="text"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setLocation(e.target.value)
                        }
                    />
                </label>
                <label htmlFor="endDate">
                    <p>
                        <span>*</span> End date
                    </p>
                    <input
                        className={styles.input}
                        type='date'
                        placeholder={"Select date"}
                        max={data.dateMax}
                        min={data.dateNow}
                        onChange={(e) => setDate_1(e.target.value)}
                    />
                </label>
                <label htmlFor="endDate">
                    <p>
                        <span>*</span> End date
                    </p>
                    <input
                        className={styles.input}
                        id="inp_2"
                        type='date'
                        placeholder="Select date"
                        max={data.dateMax}
                        min={data.dateNow}
                        onChange={(e) => setDate_2(e.target.value)}
                    />
                </label>
            </form>
            <hr />
            <div className={styles.buttons}>
                <button onClick={() => closeModal()}>Cancel</button>
                <button onClick={addTrip}>Save</button>
            </div>
        </div>
    );
};

export default ModalWindow;
