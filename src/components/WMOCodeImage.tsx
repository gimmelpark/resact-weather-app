import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import wmo_weather_codes from '@/data/wmo_weather_codes.json';
import { BadgeQuestionMark } from 'lucide-react';

interface IProps {
  code: number;
  isDay: boolean;
  size?: number;
}

interface ICodeDescription {
  day: {
    description: string;
    image: string;
  };
  night: {
    description: string;
    image: string;
  };
}

const codeDescriptions: Record<string, ICodeDescription | undefined> =
  wmo_weather_codes;

function WMOCodeImage({ code, isDay, size = 20 }: IProps) {
  const dayNightKey = isDay ? 'day' : 'night';

  const description =
    codeDescriptions[code]?.[dayNightKey]?.description ??
    'Unknown weather code';
  const imgUrl = codeDescriptions[code]?.[dayNightKey]?.image;

  const imgStyles = {
    height: `${size}px`,
  };

  return (
    <Tooltip>
      <TooltipTrigger delay={0}>
        {imgUrl ? (
          <img src={imgUrl} style={imgStyles} alt={description} />
        ) : (
          <BadgeQuestionMark />
        )}
      </TooltipTrigger>

      <TooltipContent>
        <span>{description}</span>
      </TooltipContent>
    </Tooltip>
  );
}

export default WMOCodeImage;
