import { useEffect, useState } from "react";
import { fetchMealById } from "../../Services/meal-db-endpoint.service";
import { CardProps } from "../../Shared/Models/Contracts/card-props";
import { MealDetails } from "../../Shared/Models/meal-details";


function Card(cardProp: CardProps) {
    const unselectId = -1;
    const [cardDetails, setCardDetails] = useState<MealDetails>();
    const onClicked = (event: React.MouseEvent<HTMLDivElement>): any => {
        if (event.isTrusted) {
            cardProp.onSelected(cardProp.id);
            event.stopPropagation();
        }
    }

    const onClose = (event: React.MouseEvent<HTMLButtonElement>): any => {
        if (event.isTrusted) {
            cardProp.onSelected(unselectId);
            event.stopPropagation();
        }
    }

    useEffect(() => {
        if (cardProp.selectedId !== unselectId && cardProp.selectedId !== null && cardProp.id == cardProp.selectedId) {
            fetchMealById(cardProp.selectedId).then((response) => {
                const details = new MealDetails(response.meals[0]);
                setCardDetails(details);
            });
        }

    }, [cardProp.selectedId])

    return <>

        <div className={`${cardProp.selectedId === unselectId
            ? "bg-blue-200 w-64 hover:bg-blue-300 hover:cursor-pointer text-center"
            : cardProp.selectedId === cardProp.id
                ? "bg-blue-300 mx-auto w-full flex flex-row relative items-start overflow-y-auto"
                : "hidden"} shadow-lg rounded-xl overflow-hidden p-4`}
            onClick={onClicked}>
            <img src={cardProp.img} alt={cardProp.name} className={`rounded-md ${cardProp.selectedId === unselectId ? "w-full h-40 object-cover" : "w-1/4 h-auto object-contain"}`} />
            {
                cardProp.selectedId === unselectId ?
                    (
                        <h2 className="text-lg font-semibold mt-2">{cardProp.name}</h2>
                    ) :
                    (
                        <div className="w-3/4 text-normal ml-2 px-2 text-black">
                            <div className="font-bold">{cardDetails?.name}</div>
                            <div><span className="font-bold">Ingredients:</span>
                                {
                                    Object.entries(cardDetails?.ingredientDict || {}).map(([key, value],index) => (
                                        <div key={key}><span>{index+1}. {key}: {value}</span></div>
                                    ))
                                }
                            </div>
                            <div>
                                <span className="font-bold">Recipe:</span>
                                {
                                    cardDetails?.steps.map((step, index) => (
                                        <div key={index}><span>{index + 1}. {step}</span></div>
                                    ))
                                }
                            </div>
                        </div>
                    )
            }
            {
                cardProp.selectedId === unselectId ?
                    (
                        <div></div>
                    ) :
                    (
                        <button className="absolute top-2 right-2 bg-red-400 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500 hover:cursor-pointer focus:outline-none" onClick={onClose}>X</button>
                    )
            }
        </div>
    </>
}

export default Card;
