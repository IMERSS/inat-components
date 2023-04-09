import { useEffect, useState } from "react";
import { DataSource } from "../__shared";

type UseLoadSourceData = {
	taxonId?: number;
	placeId?: number;
	perPage?: number;
	source?: DataSource;
	dataUrl?: string;
	year?: number,
	action: any;
};

/**
 * This hooks handles loading the iNat data from whatever source has been specified (DataSource):
 * - "dataProp": the user has already fed in the data to the component (RecentObservations, CommonTaxa etc) so
 *   nothing needs to be done.
 * - "autoLoad": the user is developing locally and wants to just ping iNat directly for the source
 * - "url": the user has generated the data sources at a URL somewhere via @imerss/inat-component-utils
 */
export const useLoadSourceData = ({
	taxonId,
	placeId,
	perPage,
	source,
	dataUrl,
	year,
	action
}: UseLoadSourceData) => {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<any>([]);

	useEffect(() => {
		if (source === DataSource.autoLoad) {
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
				const obs = await action({ taxonId, placeId, perPage, year });
				setResults(obs.results);
				setLoading(false);
			})();
		}

		if (source === DataSource.url) {
			if (!dataUrl) {
				console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
				return;
			}

			(async () => {
				setLoading(true);
				const obs = await fetch(dataUrl);
				const json = await obs.json();
				setResults(json.results);
				setLoading(false);
			})();
		}
	}, [source, dataUrl, taxonId, placeId, year, perPage]);

	return {
		loading, results
	};
}
