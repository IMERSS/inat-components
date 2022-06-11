import fs from "fs";
import sleep from "sleep-promise";
import cliProgress from "cli-progress";
import { getRecentObservations } from "../client/src/api/recentObservations";
import { getCommonTaxa } from "../client/src/api/commonTaxa";
import { getFavourites } from "../client/src/api/favourites";
import {INatApi, ConfigurationSet} from "../client/src/typings";
import {getDemoConfigurations} from "../client/src/demo/demo.config";

const configurationSets: ConfigurationSet[] = [
    {
        name: "Demo files",
        filenamePrefix: "",
        configurations: getDemoConfigurations()
    }
];

const generateFile = async ({ config, set }: any) => {
    let data;
    if (config.api === INatApi.recentObservations) {
        data = await getRecentObservations({
            taxonId: config.taxonId,
            placeId: config.placeId,
            perPage: config.perPage
        });
    } else if (config.api === INatApi.commonTaxa) {
        data = await getCommonTaxa({
            taxonId: config.taxonId,
            placeId: config.placeId,
            perPage: config.perPage,
            year: config.year as string
        });
    } else if (config.api === INatApi.favourites) {
        data = await getFavourites({
            taxonId: config.taxonId,
            placeId: config.placeId,
            perPage: config.perPage,
            year: config.year as string
        });
    }

    const filename = `${set.filenamePrefix}${config.filename}`;
    const filenameWithPath = `${__dirname}/public/${filename}`;
    const content = config.minify ? JSON.stringify(data) : JSON.stringify(data, null, "\t");

    if (fs.existsSync(filenameWithPath)) {
        fs.unlinkSync(filenameWithPath);
    }
    fs.writeFileSync(filenameWithPath, content);
};


const process = async () => {
    const queue: any = [];
    let currentIndex = 0;

    const loadingBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    const processQueue = async () => {
        await generateFile(queue[currentIndex]);
        loadingBar.update(currentIndex);
        currentIndex++;
        await sleep(1000);

        if (currentIndex < queue.length) {
            await processQueue();
        } else {
            loadingBar.stop();
        }
    };

    configurationSets.map((set) => {
        set.configurations.map((config) => {
            queue.push({ set, config });
        })
    });

    loadingBar.start(queue.length, 0);

    await processQueue();
}

(async () => {
    await process();
})();

