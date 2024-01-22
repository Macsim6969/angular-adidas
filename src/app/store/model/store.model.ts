import {ProdsFromService} from "../../interfaces/home.interface";

export interface StoreInterface {
  count: number;
  hl: string;
  country: string;
  load: boolean
  dataList: ProdsFromService[]
  hoodiesList: ProdsFromService[]
}
