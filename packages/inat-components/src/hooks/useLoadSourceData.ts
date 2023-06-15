import { useEffect, useState } from "react";
import { DataSource, DataSourceEnum } from "../__shared";

type UseLoadSourceData = {
	action: any;
	taxonId?: number;
	placeId?: number;
	numResults?: number;
	source?: DataSource;
	dataUrl?: string;
	year?: number | string,
	isSummaryData?: boolean;
};

/**
 * This hook handles loading the iNat data from whatever source has been specified (DataSource):
 *   nothing needs to be done.
 * - "autoLoad": the user is developing locally and wants to just ping iNat directly for the source
 * - "url": the user has generated the data sources at a URL somewhere via @imerss/inat-component-utils
 */
export const useLoadSourceData = ({
	taxonId,
	placeId,
	numResults,
	source,
	dataUrl,
	year,
	action,
	isSummaryData = false
}: UseLoadSourceData) => {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<any>([]);

	useEffect(() => {
		if (source === DataSourceEnum.autoLoad) {
			if (!taxonId) {
				console.error("Please supply a `taxonId` prop for the `autoLoad` source prop option.");
				return;
			}
			if (!placeId) {
				console.error("Please supply a `placeId` prop for the `autoLoad` source prop option.");
				return;
			}

			(async () => {
				setLoading(true);

				// note that `year` isn't used for recentObservations, but we pass it anyway to get more reusability out
				// of this hook
				const obs = await action({ taxonId, placeId, numResults, year });
				setResults(obs.results);
				setLoading(false);
			})();
		}

		if (source === DataSourceEnum.url) {
			if (!dataUrl) {
				console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
				return;
			}

			(async () => {
				setLoading(true);
				const obs = await fetch(dataUrl);
				const json = await obs.json();

				// hack workaround. Better solution would have been to standardize the JSON structure at the top-level
				if (isSummaryData) {
					setResults(json);
				} else {
					setResults(json.results);
				}
				setLoading(false);
			})();
		}
	}, [source, dataUrl, taxonId, placeId, year, numResults, isSummaryData]);

	return {
		loading, results
	};
}
