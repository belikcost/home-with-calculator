import React, { useEffect, useState } from "react";

import { Tarifs } from "./Tarifs";


const initialData = {
    type: 'card',
    design: 'default',
    options: 'white',
    productAmount: 500,
    personAmount: 500,
    encodingType: 'taglme',
    subscriptionPlan: 'basic',
    subscriptionPeriod: 12
};

const initialMinimumProductAmount = 5;


export const Calculator = ({calculate, error, success, handleCalculateRequest, handleCreateCartRequest}) => {
    const [amountError, setAmountError] = useState(false);

    const [data, setData] = useState(initialData);
    const [modalOpen, setModalOpen] = useState(false);

    const [minimumProductAmount, setMinimumProductAmount] = useState(initialMinimumProductAmount);

    const handleClose = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        handleCalculateRequest(data);
    }, [])

    const handleChange = (name, value) => {
        let localData = {...data, [name]: value};

        if (name === 'type' || name === 'design') {

            if (localData.type === 'card') {

                if (localData.design === 'default') {
                    localData = {...localData, options: 'white'};
                } else if (localData.design === 'custom') {
                    localData = {...localData, options: ''};
                }

            } else if (localData.type === 'sticker') {
                localData = {...localData, options: '22mm'};
            }

            if (name === 'design') {

                if (value === 'default') {
                    localData = {...localData, productAmount: initialMinimumProductAmount};
                    setMinimumProductAmount( initialMinimumProductAmount);
                } else if (value === 'custom') {
                    localData = {...localData, productAmount: 50};
                    setMinimumProductAmount( 50);
                }

            }

        } else if (name === 'encodingType') {

            if (value === 'taglme') {
                localData = {
                    ...localData,
                    subscriptionPlan: initialData.subscriptionPlan,
                    subscriptionPeriod: initialData.subscriptionPeriod
                };
            } else {
                localData = {...localData, subscriptionPlan: '', subscriptionPeriod: 0};
            }

        }

        if (+localData.productAmount >= minimumProductAmount && +localData.personAmount >= 1) {
            handleCalculateRequest(localData);
        }

        setData(localData);
    };

    const handleChangeProductAmount = (e) => {
        const value = e.target.value;

        if (value <= 1000) {
            handleChange('productAmount', value);
        } else {
            handleChange('productAmount', 1000);
        }
    }

    const handleChangePersonAmount = (e) => {
        const value = e.target.value;

        if (value <= 1000) {
            handleChange('personAmount', value);
        } else {
            handleChange('personAmount', 1000);
        }
    }

    const handleChooseSubscriptionPlan = (plan) => {
        handleChange('subscriptionPlan', plan);
        handleClose();
    }

    const handleChooseOption = (option) => {
        if (option === 'firstOption') {

            if (data.type === 'sticker') {
                handleChange('options', '22mm');
            } else {
                handleChange('options', 'white');
            }

        } else if (option === 'secondOption') {

            if (data.type === 'sticker') {
                handleChange('options', '30mm')
            } else {
                handleChange('options', 'black');
            }

        }
    }

    const handleCreateCart = () => {
        let localError = false;

        if (data.productAmount >= minimumProductAmount && data.personAmount >= 1) {
            handleCreateCartRequest(data);
        } else {
            localError = true;
        }

        setAmountError(localError);
    }

    const withMargins = (price) => price.toLocaleString('ru-RU');
    const calculateWidth = (amount) => (amount * 100 / 1000) - 1;


    return (
        <>
            <div className="wrapper">
                <div className="calc__content">
                    <h2 className="title2">Онлайн-калькулятор</h2>
                    <div className="calc__main">
                        <div className="calc__controls">
                            <div className="calc__item-name">Тип визиток</div>
                            <div className="calc__group">
                                <input
                                    className="form-radio"
                                    type="radio"
                                    id="card"
                                    checked={data.type === 'card'}
                                    onChange={() => handleChange('type', 'card')}
                                />
                                <label className="form-btn calc__btn" htmlFor="card">Карта</label>

                                <input
                                    className="form-radio"
                                    type="radio"
                                    id="sticker"
                                    checked={data.type === 'sticker'}
                                    onChange={() => handleChange('type', 'sticker')}
                                />
                                <label className="form-btn calc__btn" htmlFor="sticker">Объемная наклейка</label>
                            </div>
                            <div className="calc__item-name">Дизайн</div>
                            <div className="calc__group">
                                <input
                                    className="form-radio"
                                    type="radio"
                                    id="default"
                                    checked={data.design === 'default'}
                                    onChange={() => handleChange('design', 'default')}
                                />
                                <label className="form-btn calc__btn" htmlFor="default">Стандартный макет</label>

                                <input
                                    className="form-radio"
                                    type="radio"
                                    id="custom"
                                    checked={data.design === 'custom'}
                                    onChange={() => handleChange('design', 'custom')}
                                />
                                <label className="form-btn calc__btn" htmlFor="custom">Свой макет</label>
                            </div>
                            {((data.type === 'card' && data.design === 'default') || data.type === 'sticker') && (
                                <>
                                    <div className="calc__item-name">Опции</div>
                                    <div className="calc__group">
                                        <input
                                            className="form-radio"
                                            type="radio"
                                            id="firstOption"
                                            checked={data.type === 'sticker' ? data.options === '22mm' : data.options === 'white'}
                                            onChange={() => handleChooseOption('firstOption')}
                                        />
                                        <label className="form-btn calc__btn" htmlFor="firstOption">
                                            {data.type === 'sticker' ? '22мм диаметр' : 'White'}
                                        </label>

                                        <input
                                            className="form-radio"
                                            type="radio"
                                            id="secondOption"
                                            checked={data.type === 'sticker' ? data.options === '30mm' : data.options === 'black'}
                                            onChange={() => handleChooseOption('secondOption')}
                                        />
                                        <label className="form-btn calc__btn" htmlFor="secondOption">
                                            {data.type === 'sticker' ? '30мм диаметр' : 'Black'}
                                        </label>
                                    </div>
                                </>
                            )}
                            <div className="calc__item-name">Общее количество визиток</div>
                            <div className="calc__group">
                                <input
                                    className="form-field calc__field calc__field_card"
                                    type="number"
                                    placeholder="Кол-во"
                                    value={data.productAmount}
                                    onChange={handleChangeProductAmount}
                                />

                                <div className="calc__range calc__range_card">
                                    <span
                                        style={{width: data.productAmount ? `${calculateWidth(data.productAmount)}%` : '0'}}/>
                                    <input
                                        className="calc__range-input"
                                        type="range"
                                        min={minimumProductAmount}
                                        max={1000}
                                        value={data.productAmount}
                                        onChange={handleChangeProductAmount}
                                    />
                                </div>
                            </div>
                            <div className="calc__item-name">Общее количество персон</div>
                            <div className="calc__group">
                                <input
                                    className="form-field calc__field calc__field_person"
                                    type="number"
                                    placeholder="Кол-во"
                                    value={data.personAmount}
                                    onChange={handleChangePersonAmount}
                                />

                                <div className="calc__range calc__range_person">
                                    <span
                                        style={{width: data.personAmount ? `${calculateWidth(data.personAmount)}%` : '0'}}/>
                                    <input
                                        className="calc__range-input"
                                        type="range"
                                        min={1}
                                        max={1000}
                                        value={data.personAmount}
                                        onChange={handleChangePersonAmount}
                                    />
                                </div>
                            </div>
                            <div className="calc__item-name">Кодирование визиток</div>
                            <div className="calc__group calc__group_mobile_full">
                                <input
                                    className="form-radio"
                                    type="radio"
                                    id="code-service"
                                    checked={data.encodingType === 'taglme'}
                                    onChange={() => handleChange('encodingType', 'taglme')}
                                />
                                <label className="form-btn calc__btn" htmlFor="code-service">
                                    Подключить сервис Taglme
                                </label>

                                <input
                                    className="form-radio"
                                    type="radio"
                                    id="code-record"
                                    checked={data.encodingType === 'custom'}
                                    onChange={() => handleChange('encodingType', 'custom')}
                                />
                                <label className="form-btn calc__btn" htmlFor="code-record">
                                    Запись моих ссылок
                                </label>

                                <input
                                    className="form-radio"
                                    type="radio"
                                    id="code-not-record"
                                    checked={data.encodingType === 'none'}
                                    onChange={() => handleChange('encodingType', 'none')}
                                />
                                <label className="form-btn calc__btn" htmlFor="code-not-record">
                                    Ничего не записывать
                                </label>
                            </div>
                            {data.encodingType === 'taglme' && (
                                <>
                                    <div className="calc__item-name">Выбор тарифа подписки на сервис</div>
                                    <div className="calc__group calc__group_mobile_full">
                                        <input
                                            className="form-radio"
                                            type="checkbox"
                                            id="this-rate"
                                            checked
                                            readOnly={true}
                                        />
                                        <label className="form-btn calc__btn" htmlFor="this-rate">
                                            {data.subscriptionPlan === 'starter' && 'Начальный'}
                                            {data.subscriptionPlan === 'basic' && 'Базовый'}
                                            {data.subscriptionPlan === 'professional' && 'Профессиональный'}
                                            {data.subscriptionPlan === 'enterprise' && 'Корпоративный'}
                                        </label>
                                        <button
                                            onClick={() => setModalOpen(true)}
                                            className="btn btn_second calc__btn-settings"
                                        >
                                            Настроить
                                        </button>
                                    </div>
                                    <div className="calc__item-name">Выбор срока подписки</div>
                                    <div className="calc__group">
                                        <input
                                            className="form-radio"
                                            type="radio"
                                            id="6-month"
                                            checked={data.subscriptionPeriod === 6}
                                            onChange={() => handleChange('subscriptionPeriod', 6)}
                                        />
                                        <label className="form-btn calc__btn" htmlFor="6-month">6 месяцев</label>

                                        <input
                                            className="form-radio"
                                            type="radio"
                                            id="1-year"
                                            checked={data.subscriptionPeriod === 12}
                                            onChange={() => handleChange('subscriptionPeriod', 12)}
                                        />
                                        <label className="form-btn calc__btn" htmlFor="1-year">1 год</label>

                                        <input
                                            className="form-radio"
                                            type="radio"
                                            id="2-year"
                                            checked={data.subscriptionPeriod === 24}
                                            onChange={() => handleChange('subscriptionPeriod', 24)}
                                        />
                                        <label className="form-btn calc__btn" htmlFor="2-year">2 года</label>
                                    </div>
                                </>
                            )}
                            {calculate && (
                                <div className="calc__result">
                                    <div className="calc__result-main">
                                        <div className="calc__result-item">
                                            <p className="text calc__result-text">
                                                Цена за визитку: <span className="calc__result-value">
                                                {withMargins(calculate.costPerUnit)} ₽
                                            </span>
                                            </p>
                                        </div>
                                        <div className="calc__result-item">
                                            <p className="text calc__result-text">
                                                Всего за <span
                                                className="calc__result-cards-count">{data.productAmount}</span> визиток: <span
                                                className="calc__result-value calc__result-value_cards">
                                                {withMargins(calculate.costPerUnit * data.productAmount)} ₽
                                            </span>
                                            </p>
                                        </div>
                                        {data.encodingType === 'taglme' ? calculate.subscriptionCostPerMonth && (
                                            <>
                                                <div className="calc__result-item">
                                                    <p className="text calc__result-text">
                                                        Цена за подписку: <span className="calc__result-value">
                                                 {withMargins(calculate.subscriptionCostPerMonth)} ₽/мес.</span>
                                                    </p>
                                                </div>
                                                <div className="calc__result-item">
                                                    <p className="text calc__result-text">
                                                        {calculate.subscriptionPeriod === 6 && 'Всего за 6 месяцев: '}
                                                        {calculate.subscriptionPeriod === 12 && 'Всего за 1 год: '}
                                                        {calculate.subscriptionPeriod === 24 && 'Всего за 2 года: '}
                                                        <span className="calc__result-value">
                                                            {withMargins(calculate.subscriptionCostTotal)} ₽
                                                        </span>
                                                    </p>
                                                </div>
                                            </>
                                        ) : calculate.encodingCostPerUnit && (
                                            <>
                                                <div className="calc__result-item">
                                                    <p className="text calc__result-text">
                                                        Цена за кодирование: <span className="calc__result-value">
                                                 {withMargins(calculate.encodingCostPerUnit)} ₽/шт.</span>
                                                    </p>
                                                </div>
                                                <div className="calc__result-item">
                                                    <p className="text calc__result-text">
                                                        Всего за {calculate.encodingAmount} визиток: <span className="calc__result-value">
                                                            {withMargins(calculate.encodingCostTotal)} ₽</span>
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="calc__total">Итого: <span className="calc__total-value">
                                        {withMargins(calculate.totalCost)} ₽
                                    </span>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <p className="calc__error">Ошибка. Проверьте, что все поля заполнены корректно</p>
                            )}
                            {amountError && (
                                <p className="calc__error">
                                    Ошибка. Минимальное кол-во визиток: {minimumProductAmount}, а персон: {1}
                                </p>
                            )}
                            {success && (
                                <p className="calc__success">Товар успешно добавлен в корзину!</p>
                            )}
                            <button
                                className="btn calc__cart-btn"
                                onClick={handleCreateCart}
                            >
                                Добавить в корзину
                            </button>
                        </div>
                        <div className="calc__preview">
                            {data.type === 'card' ? (
                                <>
                                    {data.design === 'default' ? (
                                        <>
                                            {data.options === 'black' ? (
                                                <>
                                                    <img
                                                        src="images/calc/card-1-black.png"
                                                        alt=""
                                                        className="calc__card calc__card_1"
                                                    />
                                                    <img
                                                        src="images/calc/card-2-black.png"
                                                        alt=""
                                                        className="calc__card calc__card_2"
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <img
                                                        src="images/calc/card-1-white.png"
                                                        alt=""
                                                        className="calc__card calc__card_1"
                                                    />
                                                    <img
                                                        src="images/calc/card-2-white.png"
                                                        alt=""
                                                        className="calc__card calc__card_2"
                                                    />
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src="images/calc/card-1-custom-white.png"
                                                alt=""
                                                className="calc__card calc__card_1"
                                            />
                                            <img
                                                src="images/calc/card-2-white.png"
                                                alt=""
                                                className="calc__card calc__card_2"
                                            />
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {data.design === 'default' ? (
                                        <>
                                            <img
                                                src="images/calc/sticker-1.png"
                                                alt=""
                                                className="calc__card calc__card_1"
                                            />
                                            <img
                                                src="images/calc/sticker-2.png"
                                                alt=""
                                                className="calc__card calc__card_2"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src="images/calc/sticker-1-custom.png"
                                                alt=""
                                                className="calc__card calc__card_1"
                                            />
                                            <img
                                                src="images/calc/sticker-2-custom.png"
                                                alt=""
                                                className="calc__card calc__card_2"
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <Tarifs
                    handleClose={handleClose}
                    handleChoose={handleChooseSubscriptionPlan}
                />
            )}
        </>
    );
}