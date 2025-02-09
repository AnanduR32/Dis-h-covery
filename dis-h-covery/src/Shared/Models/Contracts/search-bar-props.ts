export interface SearchBarProps {
    cuisines: string[],
    onSelected: (cuisine:string) => void,
    onValueUpdated: (meal:string) => void,
}