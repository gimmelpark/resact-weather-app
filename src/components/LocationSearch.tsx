import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Locate } from 'lucide-react';

interface IProps {
  searchString: string;
  onSearchStringChange: (value: string) => void;
}

function LocationSearch({ searchString, onSearchStringChange }: IProps) {
  return (
    <div>
      <Field orientation="horizontal">
        <Input
          className="rounded"
          type="text"
          placeholder="Enter location name"
          value={searchString}
          onChange={(e) => {
            onSearchStringChange(e.target.value);
          }}
        />

        <Button className="cursor-pointer rounded">
          <Locate />
        </Button>
      </Field>
    </div>
  );
}

export default LocationSearch;
