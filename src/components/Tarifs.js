export const Tarifs = ({handleClose, handleChoose, subscriptions}) => {

    return (
        <div className="tarif">
            <div className="tarif__content">
                <h2 className="title2">Тарифы</h2>
                <div className="tarif__list">
                    {subscriptions.map(subscription => (
                        <div className="tarif__item" key={subscription.id}>
                            <div className="tarif__name">{subscription.title}</div>
                            <div className="tarif__price">{subscription.price} ₽/мес</div>
                            <ul className="tarif__advs">
                                {subscription.features.map((feature, i) => (
                                    <li className="tarif__adv" key={i}>{feature}</li>
                                ))}
                            </ul>
                            <button className="btn tarif__btn" onClick={() => handleChoose(subscription.code)}>Выбрать</button>
                        </div>
                    ))}
                </div>
                <button onClick={handleClose} className="tarif__close"/>
            </div>
        </div>
    );
}