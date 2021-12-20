declare namespace Model {
    interface ResponseValue<T> {
        config:object;
        data:any;
        header:object;
        status:number;
        statusText:string;
    }

    interface CheckerPayload {
        entries: CheckerEntry[];
        infoNum: number;
        warningNum: number;
        errorNum: number;
    }
}
