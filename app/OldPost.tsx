import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Select() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Chọn..."
    />
  );
}
