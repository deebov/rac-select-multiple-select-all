import { useContext, useState } from "react";
import {
    Button,
    type Key,
    Label,
    ListBox,
    ListBoxItem,
    Popover,
    Select,
    SelectStateContext,
    SelectValue,
    type Selection,
} from "react-aria-components";

const fruits = ["Apple", "Banana", "Cherry", "Grape", "Mango"];

/** Rendered inside the Select popover, so it can read the Select's state. */
function SelectAllButton() {
    const state = useContext(SelectStateContext);

    return <Button onPress={() => state?.selectionManager.selectAll()}>selectionManager.selectAll()</Button>;
}

export function App() {
    const [value, setValue] = useState<Key[]>([]);
    const [onChangeCalls, setOnChangeCalls] = useState(0);
    const [listBoxSelection, setListBoxSelection] = useState<Selection>(new Set());

    return (
        <>
            <h1>Select multiple: selectAll() is ignored</h1>

            <section>
                <h2>1. Select with selectionMode="multiple"</h2>
                <Select
                    selectionMode="multiple"
                    value={value}
                    onChange={(keys) => {
                        setValue(keys);
                        setOnChangeCalls((count) => count + 1);
                    }}
                >
                    <Label>Fruits</Label>
                    <Button>
                        <SelectValue />
                    </Button>
                    <Popover>
                        <ListBox>
                            {fruits.map((fruit) => (
                                <ListBoxItem key={fruit} id={fruit}>
                                    {fruit}
                                </ListBoxItem>
                            ))}
                        </ListBox>
                        <SelectAllButton />
                    </Popover>
                </Select>
                <p>
                    value: <code data-testid="select-value">{JSON.stringify(value)}</code>
                    <br />
                    onChange calls: <code data-testid="select-onchange">{onChangeCalls}</code>
                </p>
                <p>
                    Open the popover, then press <b>Cmd/Ctrl+A</b> in the list or click <b>selectionManager.selectAll()</b>. Nothing gets selected and{" "}
                    <code>onChange</code> is never called. Clicking an option works.
                </p>
            </section>

            <section>
                <h2>2. Control: standalone ListBox with selectionMode="multiple"</h2>
                <ListBox
                    className="react-aria-ListBox standalone"
                    aria-label="Fruits"
                    selectionMode="multiple"
                    selectedKeys={listBoxSelection}
                    onSelectionChange={setListBoxSelection}
                >
                    {fruits.map((fruit) => (
                        <ListBoxItem key={fruit} id={fruit}>
                            {fruit}
                        </ListBoxItem>
                    ))}
                </ListBox>
                <p>
                    selection:{" "}
                    <code data-testid="listbox-value">{listBoxSelection === "all" ? '"all"' : JSON.stringify([...listBoxSelection])}</code>
                </p>
                <p>
                    Focus the list and press <b>Cmd/Ctrl+A</b>: every item is selected.
                </p>
            </section>
        </>
    );
}
