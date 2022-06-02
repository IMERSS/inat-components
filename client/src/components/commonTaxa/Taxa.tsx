import React, {useEffect, useState} from 'react';
import {Observation} from "../observation/Observation";
import Loader from "../loader/Loader";
import {PageProps} from "../../general";
import {getCommonTaxa} from "../../utils/api";
import {numberWithCommas} from "../../utils/numberUtils";
import generalStyles from "../../css/general.module.scss";

export const CommonTaxa = ({ year, taxonId, placeId }: PageProps) => {
    const [taxa, setTaxa] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCommonTaxa(taxonId, placeId, year, (resp: any) => {
            setTaxa(resp);
            setLoading(false);
        });
    }, [year, placeId, taxonId]);

    return (
        <div style={{ position: 'relative' }}>
            <Loader loading={loading} />
            <div className={generalStyles.grid}>
                {taxa.map(({ taxon }: any) => {
                    const url = `https://www.inaturalist.org/taxa/${taxon.id}`;

                    return (
                        <Observation
                            key={taxon.id}
                            imageUrl={taxon.default_photo.url.replace(/square/, "medium")}
                            linkUrl={url}>
                            <div className={generalStyles.obsLabel}>
                                <h3>{taxon.name}</h3>
                                <div>{numberWithCommas(taxon.observations_count)}</div>
                            </div>
                        </Observation>
                    );
                })}
            </div>
        </div>
    )
};