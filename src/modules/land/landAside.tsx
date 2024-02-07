import { Feature } from "ol";
import { useVectorFeatures } from "../map/useVectorFeatures";

export type LandFeature = {
    getProperties(): LandProperties;
} & Feature;

interface LandProperties {
    name: string;
}

export function LandAside() {
    const { visibleFeatures } = useVectorFeatures<LandFeature>(
        (l) => l.getClassName() === "land"
    );

    return (
        <aside className={visibleFeatures?.length ? "visible" : "hidden"}>
            <div>
                <h2>Fylker</h2>
                <ul>
                    {visibleFeatures?.map((k) => (
                        <li>{k.getProperties().name}</li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
