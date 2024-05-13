import React from "react";
import "./card.css";
import Skeleton from "react-loading-skeleton";

const EmptyCard: React.FC = () => {
    return(
        <div className="card">
            <Skeleton borderRadius="12px 12px 0 0" height="200px" containerClassName="avatar-skeleton"/>
            <div className="card__body">
                <Skeleton height="23px"/>
                <div className="card__content">
                    <Skeleton height="100px"/>
                    <div className="card__tags">
                        {
                            [1, 2, 3].map(tag => (
                                <Skeleton key={tag} height="18px" width="70px"/>
                            ))
                        }
                    </div>
                    <Skeleton height="23px"/>
                    <Skeleton height="14px"/>
                </div>
                <div className="card__buttons">
                    <Skeleton height="33px" width="120px"/>
                    <Skeleton height="33px" width="76px"/>
                </div>
            </div>
        </div>
    )
}

export default EmptyCard;