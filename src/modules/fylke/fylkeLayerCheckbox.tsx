import { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Stroke, Style, Text } from "ol/style";
import { FylkeFeature } from "./fylkeAside";
import { useLayer } from "../map/useLayer";

const fylkeLayer = new VectorLayer({
    className: "fylker",
    source: new VectorSource({
        url: "/KWS2100-lecture-05/fylker.json",
        format: new GeoJSON(),
    }),
    style: (feature) => {
        const fylke = feature as FylkeFeature;
        const { navn } = fylke.getProperties();
        const norwegianName = navn.find((name) => name.sprak === "nor");
        return new Style({
            stroke: new Stroke({
                color: "orange",
                width: 1,
            }),
            text: new Text({
                stroke: new Stroke({
                    color: "white",
                    width: 3,
                }),
                text: norwegianName ? norwegianName.navn : "",
            }),
        });
    },
});

export function FylkeLayerCheckbox() {
    const [checked, setChecked] = useState(false);
    useLayer(fylkeLayer, checked);

    return (
        <div className="form-check form-switch">
            <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                {checked ? "Hide" : "Show"} Fylker
            </label>
        </div>
    );
}
