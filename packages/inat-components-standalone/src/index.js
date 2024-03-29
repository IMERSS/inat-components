/**
 * This file is used to create a single JS file containing all the libs and all the code needed to render
 * the full Taxon Panel. A user uses it by including the standalone.min.js file in their page, then doing this:
 *
 * <div id="target-dom-node"></div>
 *
 * <script>
 *     inatComponents.initTaxonPanel('target-dom-node', SETTINGS)
 * </script>
 *
 * `SETTINGS` is an object defining whatever taxon info + settings they want. See the documentation.
 */

import React from "react";
import { createRoot } from "react-dom/client";
import TaxonPanel from "@imerss/inat-components";

window.inatComponents = {
    initTaxonPanel: (domId, settings) => {
        const el = document.getElementById(domId);
        if (!el) {
            console.error(`A DOM element with id ${domId} was not found.`);
            return;
        }

        const root = createRoot(el);
        root.render(<TaxonPanel {...settings} />);
    }
};
