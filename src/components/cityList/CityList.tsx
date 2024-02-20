import styles from "./CityList.module.css";
import data from "../../state/dataState";
import { observer } from "mobx-react-lite";
// import { useState } from "react";

interface Imodal {
    openModal: () => void;
}

const CityList: React.FC<Imodal> = observer(({ openModal }) => {
    // const [myTripList, setMyTripList] = useState(data.tripsList);
    const myTripList = data.tripsList

    return (
        <>
            <div className={styles.searchBlock}>
                <span className={styles.searchIcon}></span>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search your trip"
                />
                <div className={styles.search}>
                    <span>Sort: </span>
                    <select name="search">
                        <option>choose the option</option>
                        <option value="name">by name</option>
                        <option value="start">by start date</option>
                        <option value="end">by end date</option>
                    </select>
                </div>
            </div>
            <div className={styles.cityList}>
                <div className={styles.innerCityList}>
                    {!!myTripList.length &&
                        myTripList.map((i: any, index: number) => {
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
                                    <div className={styles.cityImage}>
                                        <img src={i.image} alt="" />
                                    </div>
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
                                        myTripList.length > 1 && (
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
            <div className={styles.buttons}>
                <button
                    name="prev"
                    disabled={!data.selected}
                    onClick={(e: any) => {
                        data.changeSelectIndex(e.target.name);
                    }}
                >
                    {"<< previous"}
                </button>
                <button
                    name="next"
                    disabled={data.selected === data.tripsList.length - 1}
                    onClick={(e: any) => data.changeSelectIndex(e.target.name)}
                >
                    {"next >>"}
                </button>
            </div>
        </>
    );
});

export default CityList;
