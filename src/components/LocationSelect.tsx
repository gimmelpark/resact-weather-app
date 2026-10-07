import type { ILocationDetails } from '@/models/geocoding';

interface IProps {
  locations?: ILocationDetails[];
  selectedLocationId?: number;
  onLocationSelect: (id: number) => void;
}

function LocationSelect({
  locations,
  selectedLocationId,
  onLocationSelect,
}: IProps) {
  if (!locations) return null;

  const getLocationCoordinatesString = (location: ILocationDetails): string => {
    const round = (num: number) => Math.round(num * 10000) / 10000;

    return `${round(location.latitude)}, ${round(location.longitude)}`;
  };

  return (
    <div className="border mb-3 rounded">
      {locations.map((location) => (
        <div
          key={location.id}
          className="flex justify-between items-center py-1 px-3 cursor-pointer hover:bg-gray-100"
          onClick={() => onLocationSelect(location.id)}
        >
          <div>
            {location.name}{' '}
            {location.country ? (
              <>
                <span className="text-gray-400 ml-2">
                  {' '}
                  ({location.country})
                </span>
              </>
            ) : null}
          </div>

          <div className="text-gray-500 text-xs font-mono">
            {getLocationCoordinatesString(location)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LocationSelect;
