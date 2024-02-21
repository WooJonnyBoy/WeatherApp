import { makeAutoObservable, runInAction } from "mobx";
import myDataType from "../types/dataType";

class Data {
    url: string = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;
    key: string = `47C8GRHUKPPXDP6ZDUQ2L69DT`;
    key_2: string = `CQE4354GF2AFQ55B8ABDW5N3G`;
    dalleKey = "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";
    dateNow: string = new Date().toISOString().slice(0, 10);
    dateMax: string = new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().slice(0, 10);
    idCount: number = 0;
    tripsList: Array<myDataType> | [] = [];
    selected: number = 0;
    fetchError: boolean = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchData(url: string, options: any = {}) {
        const response = await fetch(url, options);
        const data = response.json();
        return data;
    }

    async addTrip(
        location: string,
        date_1: string | null,
        date_2: string | null
    ) {
        this.fetchError = false;
        this.isLoading = true;
        const dateFrom = date_1 || this.dateNow;
        const dateTo = date_2 || this.dateMax;

        try {
            const dataFromTo: myDataType = await this.fetchData(
                `${this.url}${location}/${dateFrom}/${dateTo}?key=${this.key_2}&include=current`
            );

            const dataCurrent = await this.fetchData(
                `${this.url}${location}/${this.dateNow}?&include=days&key=${this.key_2}`
            );

            // const dataImage = await this.fetchData(
            //     `https://api.openai.com/v1/images/generations`,
            //     {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //             Authorization: `Bearer ${this.dalleKey}`,
            //         },
            //         body: JSON.stringify({
            //             model: "dall-e-2",
            //             prompt: `${dataFromTo.resolvedAddress}, ${dataFromTo.address} , ${dataFromTo.from} , face of the city, main attraction`,
            //             n: 1,
            //             size: "256x256",
            //         }),
            //     }
            // );

            runInAction(() => {
                dataFromTo.currentConditions = dataCurrent.currentConditions || dataCurrent.days[0];
                dataFromTo.id = this.idCount;
                dataFromTo.from = dateFrom;
                dataFromTo.to = dateTo;
                // dataFromTo.image = dataImage.data[0].url;
                this.idCount++;
                this.tripsList = [...this.tripsList, dataFromTo];
                this.isLoading = false;
                console.log(dataFromTo);
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
                this.fetchError = true;
                console.log(error + "fetch error");
            });
        }
    }

    removeTrip(id: number) {
        this.tripsList = this.tripsList.filter((i: any) => i.id !== id);
    }

    setSelectIndex(index: number) {
        this.selected = index;
    }

    changeSelectIndex(ident: string) {
        if (this.selected && ident === "prev") this.selected -= 1;
        if (this.selected < this.tripsList.length - 1 && ident === "next") this.selected += 1;
    }

    sortBy = (value: string) => {
        if (value === "start")
            this.tripsList = this.tripsList.sort(
                (a, b) => Date.parse(a.from) - Date.parse(b.from)
            );
        if (value === "end")
            this.tripsList = this.tripsList.sort(
                (a, b) => Date.parse(a.to) - Date.parse(b.to)
            );
    };
}

export default new Data();
