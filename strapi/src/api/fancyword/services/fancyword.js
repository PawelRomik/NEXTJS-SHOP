'use strict';

/**
 * fancyword service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fancyword.fancyword');
