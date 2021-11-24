import { FeatureCollection, polygon } from "@turf/helpers";
import mask from "@turf/mask";

export function maskFeatureCollectionPolygons(
  featureCollection: FeatureCollection
) {
  const sortedFeatures = featureCollection.features.sort(
    (a, b) => a.properties.id - b.properties.id
  );
  const maskedFeatureCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: [JSON.parse(JSON.stringify(sortedFeatures[0]))],
  };
  sortedFeatures.forEach((feature, index) => {
    if (index === 0) {
      return;
    }
    const originalPolygon = polygon([...feature.geometry?.coordinates]);
    const maskPolygon = polygon([
      ...sortedFeatures[index - 1]?.geometry?.coordinates,
    ]);
    const maskedPolygon = mask(originalPolygon, maskPolygon);

    maskedFeatureCollection.features.push({
      ...feature,
      geometry: {
        ...feature.geometry,
        type: "MultiPolygon",
        coordinates: [[...maskedPolygon.geometry.coordinates.reverse()]],
      },
    });
  });
  console.log({ maskedFeatureCollection });
  return maskedFeatureCollection;
}
