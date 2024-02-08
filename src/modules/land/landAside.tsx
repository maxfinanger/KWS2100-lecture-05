import { Feature } from "ol";
import { useVectorFeatures } from "../map/useVectorFeatures";

export type LandFeature = Feature;

/* interface LandProperties {
    Admin: string;
} */

export function LandAside() {
    const { visibleFeatures } = useVectorFeatures<LandFeature>(
        (feature) => feature.getClassName() === "land"
    );

    return (
        <aside className={visibleFeatures?.length ? "visible" : "hidden"}>
            <div>
                <h2>Land</h2>
                <ul>
                    {visibleFeatures?.map((feature, index) => (
                        <li key={index}>{feature.getProperties().Admin}</li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
