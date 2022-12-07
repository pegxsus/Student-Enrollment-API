const queryCondition = (queryParams) => {
    let queryCondition = {}
    for (const [key, value] of Object.entries(queryParams)) {
        if (['firstName', 'lastName', 'grade', 'division'].includes(key)) {
            queryCondition[key] = value
        }
    }
    return queryCondition
    }

    module.exports = queryCondition
