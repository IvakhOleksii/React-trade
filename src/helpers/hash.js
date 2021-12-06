const generateHash = () => {
    const length = 20;
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const generateCoupon = () => {
    const length = 14;
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        if (i > 0 && (i % 5 === 0 || i % 5 === 0)) {
            result += "-";
        } else {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }
    return result;
};

export const generateCoupons = (length) => {
    const temp = [];
    for (let i = 0; i < length; i++) {
        temp.push(generateCoupon());
    }
    return temp;
};
export default generateHash;