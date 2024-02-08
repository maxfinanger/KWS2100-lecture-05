import { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../map/useLayer";

const kommuneLayer = new VectorLayer({
    className: "kommuner",
    source: new VectorSource({
        url: "/KWS2100-lecture-05/kommuner.json",
        format: new GeoJSON(),
    }),
});

export function KommuneLayerCheckbox() {
    const [checked, setChecked] = useState(false);
    useLayer(kommuneLayer, checked);

    return (
        <div className="form-check form-switch">
            <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                {checked ? "Hide" : "Show"} Kommuner
            </label>
        </div>
    );
}
