import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Locate, X } from 'lucide-react';

interface IProps {
  searchString: string;
  onSearchStringChange: (value: string) => void;
  onGetGeolocationClick: () => void;
}

function LocationSearch({
  searchString,
  onSearchStringChange,
  onGetGeolocationClick,
}: IProps) {
  return (
    <div>
      <Field orientation="horizontal">
        <InputGroup className="rounded">
          <InputGroupInput
            type="text"
            placeholder="Enter location name"
            value={searchString}
            onChange={(e) => {
              onSearchStringChange(e.target.value);
            }}
          />

          {searchString.length ? (
            <InputGroupButton
              className="cursor-pointer mr-1"
              aria-label="Clear"
              title="Clear"
              size="icon-xs"
              onClick={() => onSearchStringChange('')}
            >
              <X />
            </InputGroupButton>
          ) : null}
        </InputGroup>

        <Button
          className="cursor-pointer rounded"
          onClick={onGetGeolocationClick}
        >
          <Locate />
        </Button>
      </Field>
    </div>
  );
}

export default LocationSearch;
