import styles from "./CityList.module.css";
import data from "../../state/dataState";
import myDataType from "../../types/dataType";
import CityCart from "../../components/CityCart/CityCart";
import { observer } from "mobx-react-lite";
import { useState, useRef } from "react";

interface Imodal {
    openModal: () => void;
}

const CityList: React.FC<Imodal> = observer(({ openModal }) => {
    const [search, setSearch] = useState<string>("");
    const block = useRef<HTMLDivElement>(null);

    const nextButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        data.changeSelectIndex(e.currentTarget.name);
        if(block.current && data.selected > 1) {
            block.current.scrollLeft = data.selected * 190
        }
    };

    const previousButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
            data.changeSelectIndex(e.currentTarget.name);
            if(block.current) {
                block.current.scrollLeft = data.selected * 200
            }
    }

    const scrollHandler = () => {
        if(block.current) {
            block.current.scrollLeft = data.tripsList.length * 250
        }
    }

    data.scrollHandler(scrollHandler)

    return (
        <>
            <div className={styles.searchBlock}>
                <span className={styles.searchIcon}></span>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search your trip"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                    }
                />
                <div className={styles.search}>
                    <span>Sort by: </span>
                    <select
                        name="search"
                        onChange={(e) => data.sortBy(e.target.value)}
                        defaultValue={"choose the option"}
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
                <div className={styles.innerCityList} ref={block}>
                    {!!data.tripsList.length &&
                        data.tripsList
                            .filter((i) => {
                                return search.length
                                    ? i.address
                                          .toLowerCase()
                                          .includes(search.toLowerCase())
                                    : i;
                            })
                            .map((i: myDataType, index: number) => {
                                return <CityCart myData={i} index={index} />;
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
                    onClick={previousButtonHandler}
                >
                    {"<< previous"}
                </button>
                <span>{data.selected + 1} of {data.tripsList.length}</span>
                <button
                    name="next"
                    disabled={data.selected === data.tripsList.length - 1}
                    onClick={nextButtonHandler}
                >
                    {"next >>"}
                </button>
            </div>
        </>
    );
});

export default CityList;
