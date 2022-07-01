import {render} from "@testing-library/react";
import {DataSource} from "../../../index";
import {Summary} from "../summary";

describe("Summary", () => {
	it("should render successfully", () => {
		const {baseElement} = render(
			<Summary
				placeId={1}
				taxonId={1}
				source={DataSource.url}
				year={2020}
				dataUrl=""
			/>
		);
		expect(baseElement).toBeTruthy();
	});
});
