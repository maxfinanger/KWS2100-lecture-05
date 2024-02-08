import { useContext, useEffect, useState } from "react";
import { MapContext } from "../map/mapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Stroke, Style, Text } from "ol/style";

const landLayer = new VectorLayer({
    className: "land",
    source: new VectorSource({
        url: "/KWS2100-lecture-05/land.json",
        format: new GeoJSON(),
    }),
    style: (feature) => {
        const land = feature.getProperties();
        const { ADMIN } = land;
        return new Style({
            stroke: new Stroke({
                color: "red",
                width: 2,
            }),
            text: new Text({
                stroke: new Stroke({
                    color: "white",
                    width: 6,
                }),
                text: ADMIN,
            }),
        });
    },
});

export function LandLayerCheckbox() {
    const [checked, setChecked] = useState(false);

    const { setLayers } = useContext(MapContext);

    useEffect(() => {
        if (checked) {
            setLayers((old) => [...old, landLayer]);
        } else {
            setLayers((old) => old.filter((l) => l !== landLayer));
        }
    }, [checked, setLayers]);

    return (
        <div className="form-check form-switch">
            <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                {checked ? "Hide" : "Show"} Countries
            </label>
        </div>
    );
}
