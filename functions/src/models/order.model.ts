import {Orderline} from "./orderline.model";

export interface Order {
    id: string;
    date: number;
    orderLines: Orderline[];
    visible: boolean;
}