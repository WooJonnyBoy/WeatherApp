import { makeAutoObservable, runInAction } from "mobx";

class Data {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;
    key = `47C8GRHUKPPXDP6ZDUQ2L69DT`;
    key_2 = `CQE4354GF2AFQ55B8ABDW5N3G`;
    dateNow = new Date().toISOString().slice(0, 10);
    dateMax = new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().slice(0, 10);
    idCount = 0;
    tripsList: any = [];
    selected: number = 0;
    findCountryError: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async addTrip(location: string, date_1: string, date_2: string) {
        this.findCountryError = false;
        let myData: any = {};
        try {
            await fetch(
                `${this.url}${location}/${date_1}/${date_2}?key=${this.key_2}&include=current`
            )
                .then((res) => res.json())
                .then((data) =>
                    runInAction(() => {
                        myData = data;
                        myData.id = this.idCount;
                        myData.from = date_1.length ? date_1 : this.dateNow;
                        myData.to = date_2.length ? date_2 : this.dateMax;
                        this.idCount++;
                    })
                );
            await fetch(
                `${this.url}${location}/${this.dateNow}?include=current&include=days&key=${this.key_2}`
            )
                .then((res) => res.json())
                .then((data) =>
                    runInAction(() => {
                        myData.currentConditions = data.currentConditions || data.days[0];
                        console.log(myData);
                    })
                );
            runInAction(() => this.tripsList.push(myData));
        } catch (error) {
            this.findCountryError = true;
            console.log(error + "fetch error");
        }
    }

    removeTrip(id: number) {
        this.tripsList = this.tripsList.filter((i: any) => i.id !== id);
    }

    setSelectIndex(index: number) {
        this.selected = index;
    }
}

export default new Data();
