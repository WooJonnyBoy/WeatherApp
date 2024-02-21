import styles from "./CityList.module.css";
import data from "../../state/dataState";
import { observer } from "mobx-react-lite";
import myDataType from "../../types/dataType";

interface Imodal {
    openModal: () => void;
}

const CityList: React.FC<Imodal> = observer(({ openModal }) => {
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
                    <span>Sort by: </span>
                    <select
                        name="search"
                        onChange={(e) => data.sortBy(e.target.value)}
                        defaultValue={'choose the option'}
                    >
                        <option disabled hidden>
                            choose the option
                        </option>
                        <option value="start">start date</option>
                        <option value="end">end date</option>
                    </select>
                </div>
            </div>
            <div className={styles.cityList}>
                <div className={styles.innerCityList}>
                    {!!data.tripsList.length &&
                        data.tripsList.map((i: myDataType, index: number) => {
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
                    {data.isLoading && (
                        <div className={styles.loadingBlock}>Loading...</div>
                    )}
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
