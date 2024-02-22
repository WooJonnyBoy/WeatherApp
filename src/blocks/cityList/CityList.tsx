import styles from "./CityList.module.css";
import data from "../../state/dataState";
import myDataType from "../../types/dataType";
import CityCart from "../../components/CityCart/CityCart";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface Imodal {
    openModal: () => void;
}

const CityList: React.FC<Imodal> = observer(({ openModal }) => {
    const [search, setSearch] = useState<string>('')

    return (
        <>
            <div className={styles.searchBlock}>
                <span className={styles.searchIcon}></span>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search your trip"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}

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
                        data.tripsList
                        .filter(i => {
                            return search.length ? i.address.toLowerCase().includes(search.toLowerCase()) : i
                        })
                        .map((i: myDataType, index: number) => {
                            return (
                                <CityCart myData={i} index={index}/>
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
