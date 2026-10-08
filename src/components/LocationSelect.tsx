import type { ILocationDetails } from '@/models/geocoding';

interface IProps {
  locations?: ILocationDetails[];
  onLocationSelect: (id: number) => void;
}

function LocationSelect({ locations, onLocationSelect }: IProps) {
  const getRoundNumber = (num: number, digits = 4): number => {
    return Math.round(num * 10 ** digits) / 10 ** digits;
  };

  const getLocationCoordinatesString = (location: ILocationDetails): string => {
    return `${getRoundNumber(location.latitude)}, ${getRoundNumber(location.longitude)}`;
  };

  if (!locations) return null;

  const reversedLocations = [...locations].reverse();

  return (
    <div className="border mb-3 rounded">
      {reversedLocations.map((location) => (
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
