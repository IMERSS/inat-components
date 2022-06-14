import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { format } from "date-fns";

export const Seasonality = ({ data }: any) => {
    const primaryAxis = React.useMemo<
        AxisOptions<typeof data[number]["data"][number]>
        >(
        () => ({
            getValue: (datum) => datum.primary as any
        }),
        []
    );

    const secondaryAxes = React.useMemo<
        AxisOptions<typeof data[number]["data"][number]>[]
        >(
        () => [
            {
                getValue: (datum) => datum.secondary,
                // stacked: true
                // OR
                elementType: "area"
            }
        ],
        []
    );

    const formattedData = [
        {
            "label": "Observations",
            "data": Object.keys(data).map((monthNum) => ({
                primary: format(new Date(2000, parseInt(monthNum, 10)-1, 1), 'MMMM'),
                secondary: data[monthNum]
            }))
        }
    ];

    return (
        <Chart
            options={{
                data: formattedData,
                primaryAxis,
                secondaryAxes
            }}
        />
    );
}