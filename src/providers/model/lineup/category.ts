import _ from "lodash";
import Im from "immutable";

import Info from "./_info.d";
import { ROOT, LINEUP } from "./lineup";
import { Item } from "./item";
import { S3File } from "../../aws/s3file";
import { Logger } from "../../util/logging";
import * as Base64 from "../../util/base64";

const logger = new Logger("Lineup.Category");

export class Category {
    private static async load(s3file: S3File, key: string): Promise<any> {
        const path = _.join([ROOT, LINEUP, key], "/");
        const text = await s3file.read(path);
        return Base64.decodeJson(text);
    }

    static async news(s3file: S3File, srcList: Im.List<Item>): Promise<Category> {
        const v = (await Category.load(s3file, "news.json")) as Info.Category;
        return new Category("news", v.title, v.message, Im.Map(v.flags), srcList);
    }

    static async byAll(s3file: S3File, srcList: Im.List<Item>): Promise<Im.List<Category>> {
        const json = (await Category.load(s3file, "categories.json")) as Info.Categories;
        const array = _.map(json, (v, key) => {
            return new Category(key, v.title, v.message, Im.Map(v.flags), srcList);
        });
        return Im.List(array);
    }

    constructor(
        public readonly key: string,
        public readonly title: string,
        public readonly message: string,
        public readonly flags: Im.Map<string, string>,
        public readonly srcList: Im.List<Item>) {
    }

    private cachedReslut: Im.List<Item>;

    filter(srcList?: Item[]): Item[] {
        if (!srcList && this.cachedReslut) {
            return this.cachedReslut.toArray();
        }

        var result = srcList || this.srcList.toArray();
        this.flags.forEach((value, name) => {
            result = _.filter(result, (item) => {
                return _.isEqual(item.flags[name], value);
            });
        });
        logger.debug(() => `Filtered items: ${_.size(srcList)} -> ${_.size(result)}`);

        if (!srcList) {
            this.cachedReslut = Im.List(result);
        }
        return result;
    }
}
