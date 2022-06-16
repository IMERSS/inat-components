import React, {useEffect, useState} from 'react';
import {Observation} from "../observation/observation";
import Loader from "../loader/loader";
import {CommonTaxaRespData, CommonTaxData, getCommonTaxa} from "../api/common-taxa";
import {numberWithCommas} from "../utils/numberUtils";
import styles from "../shared/css/general.module.scss";
import {DataSource} from "../../typings";
import * as C from "../../constants";
import {NoResults} from "../no-results/no-results";

export type CommonTaxaProps = {
  year: string;
  source?: DataSource;
  taxonId?: number;
  placeId?: number;
  perPage?: number;
  data?: CommonTaxaRespData;
  dataUrl?: string;
  components?: {
    loader?: JSX.Element;
    label?: JSX.Element;
  };
  className?: string;
}

export const CommonTaxaLabel = (data: CommonTaxData) => (
  <div className={styles.obsLabel}>
    <h3>{data.taxonCommonName || data.taxonName}</h3>
    <label className={styles.count}>{numberWithCommas(data.obsCount)}</label>
  </div>
);

export const CommonTaxa = ({
  year,
  source,
  taxonId,
  placeId,
  perPage = C.PER_PAGE,
  data,
  dataUrl,
  components,
  className
}: CommonTaxaProps) => {
  const [taxa, setTaxa] = useState<any>(() => (source === DataSource.dataProp) ? data : []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (source !== DataSource.autoLoad) {
      return;
    }
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
      const resp = await getCommonTaxa({taxonId, placeId, year, perPage});
      setTaxa(resp.results);
      setLoading(false);
    })();
  }, [source, year, placeId, taxonId, perPage]);

  useEffect(() => {
    if (source !== DataSource.url) {
      return;
    }

    if (!dataUrl) {
      console.error("Please supply a `dataUrl` prop for the `url` source prop option.");
      return;
    }

    (async () => {
      setLoading(true);
      const obs = await fetch(dataUrl);
      const json = await obs.json();
      setTaxa(json.results);
      setLoading(false);
    })();
  }, [source, dataUrl]);

  const Load = components?.loader ? components.loader as any : Loader;
  const Label = components?.label ? components.label as any : CommonTaxaLabel;

  let classes = styles.panel;
  if (className) {
    classes += ` ${className}`;
  }

  // TODO move base URL to constant (people may want inaturalist.ca etc.)
  return (
    <div className={classes}>
      <Load loading={loading}/>
      {!loading && taxa.length === 0 && <NoResults/>}
      <div className={styles.grid}>
        {taxa.map((data: CommonTaxData) => (
          <Observation
            key={data.id}
            imageUrl={data.imageUrl.replace(/square/, "medium")}
            linkUrl={`https://www.inaturalist.org/taxa/${data.id}`}>
            <Label {...data} />
          </Observation>
        ))}
      </div>
    </div>
  )
};