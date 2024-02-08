import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import "./application.css";
import "ol/ol.css";
import { KommuneLayerCheckbox } from "../kommune/kommuneLayerCheckbox";
import { map, MapContext } from "../map/mapContext";
import { Layer } from "ol/layer";
import { KommuneAside } from "../kommune/kommuneAside";
import { FylkeLayerCheckbox } from "../fylke/fylkeLayerCheckbox";
import { FylkeAside } from "../fylke/fylkeAside";
import { LandLayerCheckbox } from "../land/landLayerCheckbox";
import { LandAside } from "../land/landAside";
import { SchoolLayerCheckbox } from "../school/schoolLayerCheckbox";
import { SoundButton } from "../sound/soundButton";

export function Application() {
    function handleFocusUser(e: React.MouseEvent) {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            map.getView().animate({
                center: [longitude, latitude],
                zoom: 12,
            });
        });
    }

    const [layers, setLayers] = useState<Layer[]>([
        new TileLayer({ source: new OSM() }),
    ]);
    useEffect(() => map.setLayers(layers), [layers]);

    const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
    useEffect(() => map.setTarget(mapRef.current), []);
    return (
        <MapContext.Provider value={{ map, layers, setLayers }}>
            <header className="bg-secondary text-white p-1 rounded w-25 d-flex justify-content-center text-center">
                <h1>Kommune Kart</h1>
            </header>
            <nav className="p-3">
                <button
                    className="btn btn-outline-info btn-sm me-2"
                    onClick={handleFocusUser}
                >
                    Focus on me
                </button>
                <SoundButton />
                <KommuneLayerCheckbox />
                <FylkeLayerCheckbox />
                <LandLayerCheckbox />
                <SchoolLayerCheckbox />
            </nav>
            <main className="d-flex">
                <div ref={mapRef} className="flex-grow-1"></div>
                <KommuneAside />
                <FylkeAside />
                <LandAside />
            </main>
        </MapContext.Provider>
    );
}
