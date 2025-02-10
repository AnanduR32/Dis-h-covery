export interface CardProps {
    name: string;
    img: string;
    id: number;
    selectedId: number | null;

    onSelected: (id:number) => void,
  }