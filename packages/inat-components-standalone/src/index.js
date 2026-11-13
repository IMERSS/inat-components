/**
 * This file is used to create a single JS file containing all the libs and all the code needed to render
 * the full Taxon Panel. A user uses it by including the standalone.min.js file in their page, then doing this:
 *
 * <div id="target-dom-node"></div>
 *
 * <script>
 *     const panel = inatComponents.initTaxonPanel("target-dom-node", SETTINGS);
 * </script>
 *
 * `SETTINGS` is an object defining whatever taxon info + settings they want. See the documentation.
 */

import React from "react";
import { createRoot } from "react-dom/client";
import TaxonPanel from "@imerss/inat-components";

/**
 * Find the element into which a panel renders.
 * @param {String|Element} container - The element itself, or its id, or failing that a CSS selector matching it
 * @return {Element|null} The element, or null if there is none
 */
const findContainer = (container) => {
    let el = null;
    if (typeof container === "string") {
        el = document.getElementById(container);
        if (!el) {
            try {
                el = document.querySelector(container);
            } catch (e) {
                el = null;
            }
        }
    } else if (container instanceof Element) {
        el = container;
    }
    return el;
};

/**
 * Render a TaxonPanel into a container, which the panel thereafter owns until it is destroyed.
 * @param {String|Element} container - The element, or its id, or a CSS selector matching it
 * @param {Object} settings - The panel's settings - see the documentation
 * @return {Object|null} The panel, with methods `update(settings)`, which merges new settings over the current ones
 *     and renders the panel again, and `destroy()`, which removes the panel and leaves the container empty - or null
 *     if the container was not found
 */
const initTaxonPanel = (container, settings) => {
    const el = findContainer(container);
    let panel = null;
    if (el) {
        const root = createRoot(el);
        let current = { ...settings };
        root.render(<TaxonPanel {...current} />);
        panel = {
            container: el,
            update: (newSettings) => {
                current = { ...current, ...newSettings };
                root.render(<TaxonPanel {...current} />);
            },
            destroy: () => {
                root.unmount();
            }
        };
    } else {
        console.error(`No element was found for the container ${container}.`);
    }
    return panel;
};

window.inatComponents = {
    initTaxonPanel
};
