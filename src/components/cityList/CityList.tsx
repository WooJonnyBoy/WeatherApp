import styles from "./CityList.module.css";
import data from "../../state/dataState";
import { observer } from "mobx-react-lite";

interface Imodal {
    openModal: () => void;
}

const CityList: React.FC<Imodal> = observer(({ openModal }) => {
    return (
        <>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search your trip"
            />
            <div className={styles.cityList}>
                <div className={styles.innerCityList}>
                    {!!data.tripsList.length &&
                        data.tripsList.map((i: any, index: number) => {
                            return (
                                <div
                                    className={
                                        index === data.selected
                                            ? styles.selected
                                            : styles.tripCity
                                    }
                                    key={i.id}
                                    onClick={() => {
                                        data.setSelectIndex(index);
                                    }}
                                >
                                    <div className={styles.cityImage}></div>
                                    <div className={styles.tripDescription}>
                                        <div>{i.resolvedAddress}</div>
                                        <div className={styles.fromTo}>
                                            {i.from
                                                .split("-")
                                                .reverse()
                                                .join(".") +
                                                " - " +
                                                i.to
                                                    .split("-")
                                                    .reverse()
                                                    .join(".")}
                                        </div>
                                    </div>
                                    {index === data.selected &&
                                        data.tripsList.length > 1 && (
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    data.removeTrip(i.id);
                                                    index == 0
                                                        ? data.setSelectIndex(
                                                              index
                                                          )
                                                        : data.setSelectIndex(
                                                              index - 1
                                                          );
                                                }}
                                                className={styles.cross}
                                            >
                                                ✖
                                            </div>
                                        )}
                                </div>
                            );
                        })}
                </div>
                <div className={styles.addSity} onClick={() => openModal()}>
                    <p>+</p>
                    <p>Add trip</p>
                </div>
            </div>
        </>
    );
});

export default CityList;
