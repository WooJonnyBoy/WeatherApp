import styles from './CityCart.module.css'
import myDataType from '../../types/dataType'
import data from '../../state/dataState'

interface Idata {
    myData: myDataType
    index: number
}

const CityCart: React.FC<Idata> = ({myData, index}) => {
    return (
        <div
            className={
                index === data.selected ? styles.selected : styles.tripCity
            }
            key={myData.id}
            onClick={() => {
                data.setSelectIndex(index);
            }}
        >
            <div className={styles.cityImage}>
                <img src={myData.image} />
            </div>
            <div className={styles.tripDescription}>
                <div>{myData.resolvedAddress}</div>
                <div className={styles.fromTo}>
                    {myData.from.split("-").reverse().join(".") +
                        " - " +
                        myData.to.split("-").reverse().join(".")}
                </div>
            </div>
            {index === data.selected && data.tripsList.length > 1 && (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        data.removeTrip(myData.id);
                        index == 0
                            ? data.setSelectIndex(index)
                            : data.setSelectIndex(index - 1);
                    }}
                    className={styles.cross}
                >
                    ✖
                </div>
            )}
        </div>
    );
};

export default CityCart;
