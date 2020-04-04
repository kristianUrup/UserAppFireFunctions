import {Product} from "../models/product.model";
import {Stock} from "../models/stock.model";
import {Orderline} from "../models/orderline.model";

export interface StockRepository {
    create(product: Product, number: number): Promise<Stock>;

    lowerStock(product: Product, amount: number): Promise<void>;

    lowerStocks(orderLines: Orderline[]): Promise<void>;
}