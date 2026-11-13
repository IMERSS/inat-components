import { useEffect, useState } from "react";
import { DataSource, DataSourceEnum } from "@imerss/inat-components-shared";

type UseLoadSourceData = {
	action: any;
	taxonId?: number | string;
	placeId?: number | string;
	projectId?: number | string;
	numResults?: number;
	source?: DataSource;
	dataUrl?: string;
	year?: number | string,
	isSummaryData?: boolean;
};

/**
 * This hook handles loading the iNat data from whatever source has been specified (DataSource):
 * - "autoLoad": the data is requested from iNaturalist's API directly, by the `action` supplied
 * - "url": the data is read from files generated at a URL somewhere via @imerss/inat-components-utils
 * It returns `error` as `true` once a request has failed, or returned something other than the data.
 */
export const useLoadSourceData = ({
	taxonId,
	placeId,
	projectId,
	numResults,
	source,
	dataUrl,
	year,
	action,
	isSummaryData = false
}: UseLoadSourceData) => {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<any>([]);
	const [error, setError] = useState(false);

	// Runs a load, recording its results, or else that it failed
	const load = async (fetchResults: () => Promise<any>) => {
		setLoading(true);
		setError(false);
		try {
			setResults(await fetchResults());
		} catch (e) {
			console.error("Failed to load iNaturalist data", e);
			setResults([]);
			setError(true);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (source === DataSourceEnum.autoLoad) {
			// A project brings its own taxa and places, so that it may be supplied in place of both
			if (!projectId && !taxonId) {
				console.error("Please supply a `taxonId` or `projectId` prop for the `autoLoad` source prop option.");
				return;
			}
			if (!projectId && !placeId) {
				console.error("Please supply a `placeId` or `projectId` prop for the `autoLoad` source prop option.");
				return;
			}

			// note that `year` isn't used for recentObservations, but we pass it anyway to get more reusability out
			// of this hook
			load(async () => {
				const obs = await action({ taxonId, placeId, projectId, numResults, year });
				return obs.results;
			});
		}

		if (source === DataSourceEnum.url) {
			if (!dataUrl) {
				console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
				return;
			}

			load(async () => {
				const obs = await fetch(dataUrl);
				if (!obs.ok) {
					throw new Error(`${dataUrl} returned ${obs.status}`);
				}
				const json = await obs.json();

				// hack workaround. Better solution would have been to standardize the JSON structure at the top-level
				return isSummaryData ? json : json.results;
			});
		}
	}, [source, dataUrl, taxonId, placeId, projectId, year, numResults, isSummaryData]);

	return {
		loading, results, error
	};
}
