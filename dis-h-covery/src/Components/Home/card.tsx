import { CardProps } from "../../Shared/Models/Contracts/card-props";


function Card({ name, img }: CardProps) {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden w-64 p-4 text-center">
            <img src={img} alt={name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{name}</h2>
        </div>
    );
}

export default Card;
