import AipDropdownOption from "./AipDropdownOption";


export default class CompanyPerformanceBandDropdownOption extends AipDropdownOption {
    public convert(dataText: string): void {
        const values = dataText.split(',', 4);
        for (var i = 0; i < values.length; i++) {
            values[i] = values[i].trim();
        }
        this.key = values[0];
        this.text = `${values[0]}: ${values[1]} - ${values[2]} (${values[3]}%)`;
        this.data = parseFloat(values[1]);
    }
}