import AipDropdownOption from "./AipDropdownOption";


export default class RoleDropdownOption extends AipDropdownOption {
    public convert(dataText: string): void {
        const values = dataText.split(',', 2);
        for (var i = 0; i < values.length; i++) {
            values[i] = values[i].trim();
        }
        this.key = values[0];
        this.text = this.text = `${values[0]} (${values[1]}%)`;
        this.data = +values[1];
    }
}