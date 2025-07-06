const RegexUtil = {
    smsRequestId: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    uuid: /^[0-9a-fA-F]{8}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{4}[0-9a-fA-F]{12}$/,
    userBirthDate: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
    url: /^(https?:\/\/)?([a-zA-Z0-9\.-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?$/,
    isoDate: /^\d{4}-\d{2}-\d{2}T\d{1,2}:\d{2}:\d{2}\+\d{2}:\d{2}$/,
    dateRegEx: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    secondDateRegEx: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
    smsStatusDate: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
    email: /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    smsStatus: /^(DELIVERED|STORED|REJECTED)$/,
    userPhoneNumber: /^(^\d{7,20}$)$/,
    user_gender: /^(true|false)$/,
    utc: /^[+-](0\d|1[0-2]|\d)$/,
}

module.exports = RegexUtil