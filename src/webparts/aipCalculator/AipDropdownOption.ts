import { IDropdownOption, SelectableOptionMenuItemType } from "@fluentui/react";

export default abstract class AipDropdownOption implements IDropdownOption {

    public isSelected?: boolean = false;
    public key: string | number;
    public id?: string;
    public text: string;
    public title?: string;
    public itemType?: SelectableOptionMenuItemType = SelectableOptionMenuItemType.Normal;
    public index?: number;
    public ariaLabel?: string;
    public data?: any;
    public selected?: boolean = false;
    public disabled?: boolean = false;
    public hidden?: boolean = false;

    constructor(private dataText: string) {
        this.convert(dataText.trim());
    }

    public abstract convert(dataText: string): void;
}