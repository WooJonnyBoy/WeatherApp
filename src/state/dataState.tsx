import { makeAutoObservable, runInAction } from "mobx";
import myDataType from "../types/dataType";

class Data {
    url: string = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;
    key: string = `47C8GRHUKPPXDP6ZDUQ2L69DT`;
    key_2: string = `CQE4354GF2AFQ55B8ABDW5N3G`;
    dalleKey = "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";
    dateNow: string = new Date().toISOString().slice(0, 10);
    dateMax: string = new Date(new Date().setDate(new Date().getDate() + 15))
        .toISOString()
        .slice(0, 10);
    idCount: number = 0;
    tripsList: Array<myDataType> | [] = [];
    selected: number = 0;
    findCountryError: boolean = false;
    isLoading = false

    constructor() {
        makeAutoObservable(this);
    }

    async addTrip(
        location: string,
        date_1: string | null,
        date_2: string | null
    ) {
        this.findCountryError = false;
        this.isLoading = true
        let myData: myDataType | {} = {};
        let dateFrom = date_1 || this.dateNow;
        let dateTo = date_2 || this.dateMax;

        try {
            await fetch(
                `${this.url}${location}/${dateFrom}/${dateTo}?key=${this.key_2}&include=current`
            )
                .then((res) => res.json())
                .then((data: myDataType) =>
                    runInAction(() => {
                        data.id = this.idCount;
                        data.from = date_1 || this.dateNow;
                        data.to = date_2 || this.dateMax;
                        myData = data;
                        this.idCount++;
                    })
                )
                .catch((e) => console.log(e + "error111111"));

            await fetch(
                `${this.url}${location}/${this.dateNow}?&include=days&key=${this.key_2}`
            )
                .then((res) => res.json())
                .then((data: myDataType) =>
                    runInAction(() => {
                        myData.currentConditions =
                            data.currentConditions || data.days[0];
                        console.log(myData);
                    })
                )
                .catch((e) => console.log(e + "error2222222"));
            await fetch(`https://api.openai.com/v1/images/generations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer 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",
                },
                body: JSON.stringify({
                    model: "dall-e-2",
                    prompt: `${myData.resolvedAddress}, ${myData.from}, face of the city, main attraction`,
                    n: 1,
                    size: "256x256",
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    runInAction(() => (myData.image = data.data[0].url));
                });
            runInAction(() => this.tripsList.push(myData));
            this.isLoading = false
            console.log(myData)
        } catch (error) {
            this.isLoading = false
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

    changeSelectIndex(ident: string) {
        if (this.selected && ident === "prev") this.selected -= 1;
        if (this.selected < this.tripsList.length - 1 && ident === "next")
            this.selected += 1;
    }
}

export default new Data();