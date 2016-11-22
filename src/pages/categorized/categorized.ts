import _ from "lodash";

import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { CustomPage } from "../custom/custom";
import { CategoryController, Category } from "../../providers/model/lineup/category";
import { Item } from "../../providers/model/lineup/item";
import { Logger } from "../../providers/util/logging";

const logger = new Logger("CategorizedPage");

@Component({
    selector: 'page-categorized',
    templateUrl: 'categorized.html'
})
export class CategorizedPage {
    readonly title = "カテゴリ別";
    readonly titleCategorySelect = "カテゴリー";
    readonly priceName = "ベース価格";
    readonly priceUnit = "￥";

    category: Category;
    categories: Category[];

    constructor(params: NavParams, private nav: NavController, private ctgCtrl: CategoryController) {
        this.category = params.get("category");
        ctgCtrl.loadGenerals().then((v) => {
            this.categories = v.toArray();
            if (!_.find(this.categories, { title: this.category.title })) {
                this.categories.unshift(this.category);
            }
        });
    }

    choose(item: Item) {
        logger.info(() => `Choose ${item.key}`);
        this.nav.push(CustomPage, {
            item: item
        });
    }
}
