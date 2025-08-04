const convertValueToENG = (value) => {
    const newValue = Number(value);

    if (isNaN(newValue)) {
        return value.toString();
    } 

    if (newValue === 0) {
        return '0';
    }

    if (newValue <= 1) {
        return newValue.toFixed(2).replace(/\.0$/, '') ;
    }

    if (newValue >= 1_000_000_000_000) {
        return (newValue / 1_000_000_000_000).toFixed(2).replace(/\.0$/, '') + 't';
    }else if (newValue >= 1_000_000_000) {
        return (newValue / 1_000_000_000).toFixed(2).replace(/\.0$/, '') + 'b';
    } else if (newValue >= 1_000_000) {
        return (newValue / 1_000_000).toFixed(2).replace(/\.0$/, '') + 'm';
    } else if (newValue >= 1_000) {
        return (newValue / 1_000).toFixed(2).replace(/\.0$/, '') + 'k';
    } else {
        return newValue.toString();
    }
}

const convertValueToIDR = (budget, param="default") => {
    const newBudget = Number(budget);
    if (isNaN(newBudget) || newBudget < 0) return "0";

    if (param === "default") {
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(newBudget);
    } else {
        const trim = newBudget / 1000;
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(trim);
    }
};

const formatTableValue = (value, type) => {
    if (value === undefined || value === null) return "-";

    switch (type) {
        case "currency":
            return "Rp " + convertValueToIDR(value);
        case "simple_currency":
            return convertValueToENG(value);
        case "percentage":
            return `${parseFloat(value?.toFixed(2))}%`;
        case "coma":
            return `${parseFloat(value?.toFixed(2))}`;
        case "ratio":
            if (value < 0) {
                return `${parseFloat(value?.toFixed(2))}%`;
            } else {
                return `+${parseFloat(value?.toFixed(2))}%`;
            }
        case "number":
            return new Intl.NumberFormat("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
        default:
            return value.toString();
    }
};

export default formatTableValue;