import {
    CARD_CUSTOM,
    CARD_DEFAULT_BLACK,
    CARD_DEFAULT_WHITE,
    STICKER_CUSTOM_22MM,
    STICKER_CUSTOM_30MM,
    STICKER_DEFAULT_22MM,
    STICKER_DEFAULT_30MM
} from "./constants";


export const getProductCode = (type, design, options) => {
    let productCode;

    if (type === 'card') {

        if (design === 'default') {

            if (options === 'black') {
                productCode = CARD_DEFAULT_BLACK;
            } else if (options === 'white') {
                productCode = CARD_DEFAULT_WHITE;
            }

        } else if (design === 'custom') {
            productCode = CARD_CUSTOM;
        }

    } else if (type === 'sticker') {

        if (design === 'default') {

            if (options === '22mm') {
                productCode = STICKER_DEFAULT_22MM;
            } else if (options === '30mm') {
                productCode = STICKER_DEFAULT_30MM;
            }

        } else if (design === 'custom') {

            if (options === '22mm') {
                productCode = STICKER_CUSTOM_22MM;
            } else if (options === '30mm') {
                productCode = STICKER_CUSTOM_30MM;
            }

        }

    }

    return productCode;
};