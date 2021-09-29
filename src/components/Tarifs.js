export const Tarifs = ({handleClose, handleChoose}) => {

    return (
        <div className="tarif">
            <div className="tarif__content">
                <h2 className="title2">Тарифы</h2>
                <div className="tarif__list">
                    <div className="tarif__item">
                        <div className="tarif__name">Начальный</div>
                        <div className="tarif__price">200 ₽/мес</div>
                        <ul className="tarif__advs">
                            <li className="tarif__adv">10 управляемых меток</li>
                            <li className="tarif__adv">14 дней бесплатно</li>
                            <li className="tarif__adv">скидка 10% при оплате за год</li>
                        </ul>
                        <button className="btn tarif__btn" onClick={() => handleChoose('starter')}>Выбрать</button>
                    </div>
                    <div className="tarif__item">
                        <div className="tarif__name">Базовый</div>
                        <div className="tarif__price">1500 ₽/мес</div>
                        <ul className="tarif__advs">
                            <li className="tarif__adv">100 управляемых меток</li>
                            <li className="tarif__adv">скидка 10% при оплате за год</li>
                        </ul>

                        <button className="btn tarif__btn" onClick={() => handleChoose('basic')}>Выбрать</button>
                    </div>
                    <div className="tarif__item">
                        <div className="tarif__name">Профессиональный</div>
                        <div className="tarif__price">7000 ₽/мес</div>
                        <ul className="tarif__advs">
                            <li className="tarif__adv">500 управляемых меток</li>
                            <li className="tarif__adv">скидка 10% при оплате за год</li>
                            <li className="tarif__adv">пользовательские шаблоны</li>
                        </ul>
                        <button className="btn tarif__btn" onClick={() => handleChoose('professional')}>Выбрать</button>
                    </div>
                    <div className="tarif__item">
                        <div className="tarif__name">Корпоративный</div>
                        <div className="tarif__price">12000 ₽/мес</div>
                        <ul className="tarif__advs">
                            <li className="tarif__adv">1000 управляемых меток</li>
                            <li className="tarif__adv">скидка 10% при оплате за год</li>
                            <li className="tarif__adv">пользовательские шаблоны</li>
                            <li className="tarif__adv">интеграции</li>
                        </ul>
                        <button className="btn tarif__btn" onClick={() => handleChoose('enterprise')}>Выбрать</button>
                    </div>
                </div>
                <button onClick={handleClose} className="tarif__close"/>
            </div>
        </div>
    );
}