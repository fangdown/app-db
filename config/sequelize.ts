const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq, // = 3
  $ne: Op.ne, // != 20
  $gte: Op.gte, // >= 6
  $gt: Op.gt, // > 6
  $lte: Op.lte, // <= 10
  $lt: Op.lt, // < 10
  $not: Op.not, // IS NOT TRUE
  $in: Op.in, // IN [1, 2]
  $notIn: Op.notIn, // NOT IN [1, 2]
  $is: Op.is,
  $like: Op.like, // LIKE '%hat'
  $notLike: Op.notLike, // NOT LIKE '%hat'
  $iLike: Op.iLike, // ILIKE '%hat' (case insensitive) (PG only)
  $notILike: Op.notILike, // NOT ILIKE '%hat'  (PG only)
  $regexp: Op.regexp, // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
  $notRegexp: Op.notRegexp, // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
  $iRegexp: Op.iRegexp, // ~* '^[h|a|t]' (PG only)
  $notIRegexp: Op.notIRegexp, // !~* '^[h|a|t]' (PG only)
  $between: Op.between, // BETWEEN 6 AND 10
  $notBetween: Op.notBetween, // NOT BETWEEN 11 AND 15
  $overlap: Op.overlap, // && [1, 2] (PG array overlap operator)
  $contains: Op.contains, // @> [1, 2] (PG array contains operator)
  $contained: Op.contained, // <@ [1, 2] (PG array contained by operator)
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and, // AND (a = 5)
  $or: Op.or, // (a = 5 OR a = 6)
  $any: Op.any, // ANY ARRAY[2, 3]::INTEGER (PG only)
  $all: Op.all,
  $values: Op.values,
  $col: Op.col, // = "user"."organization_id", with dialect specific column identifiers, PG in this example
};

/**
 *
[Op.and]: {a: 5}           // AND (a = 5)
[Op.or]: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
[Op.gt]: 6,                // > 6
[Op.gte]: 6,               // >= 6
[Op.lt]: 10,               // < 10
[Op.lte]: 10,              // <= 10
[Op.ne]: 20,               // != 20
[Op.eq]: 3,                // = 3
[Op.not]: true,            // IS NOT TRUE
[Op.between]: [6, 10],     // BETWEEN 6 AND 10
[Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
[Op.in]: [1, 2],           // IN [1, 2]
[Op.notIn]: [1, 2],        // NOT IN [1, 2]
[Op.like]: '%hat',         // LIKE '%hat'
[Op.notLike]: '%hat'       // NOT LIKE '%hat'
[Op.iLike]: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
[Op.notILike]: '%hat'      // NOT ILIKE '%hat'  (PG only)
[Op.regexp]: '^[h|a|t]'    // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
[Op.notRegexp]: '^[h|a|t]' // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
[Op.iRegexp]: '^[h|a|t]'    // ~* '^[h|a|t]' (PG only)
[Op.notIRegexp]: '^[h|a|t]' // !~* '^[h|a|t]' (PG only)
[Op.like]: { [Op.any]: ['cat', 'hat']}
                       // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike
[Op.overlap]: [1, 2]       // && [1, 2] (PG array overlap operator)
[Op.contains]: [1, 2]      // @> [1, 2] (PG array contains operator)
[Op.contained]: [1, 2]     // <@ [1, 2] (PG array contained by operator)
[Op.any]: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)

[Op.col]: 'user.organization_id' // = "user"."organization_id", with dialect specific column identifiers, PG in this example
 */
