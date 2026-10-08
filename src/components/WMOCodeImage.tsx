import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  getWMODescriptionByCode,
  getWMOImageUrlByCode,
} from '@/helpers/wmo_description';
import { BadgeQuestionMark } from 'lucide-react';

interface IProps {
  code: number;
  isDay: boolean;
  size?: number;
}

function WMOCodeImage({ code, isDay, size = 36 }: IProps) {
  const description =
    getWMODescriptionByCode(code, isDay) ?? 'Unknown weather code';
  const imgUrl = getWMOImageUrlByCode(code, isDay);

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
