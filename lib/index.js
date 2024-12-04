// Local imports
require('./models/CSP.js')
require('./models/nextSafe.js')

const buildCSPHeaders = require('./buildCSPHeaders.js')
const buildPermissionsPolicyHeaders = require('./buildPermissionsPolicyHeaders.js')

/**
 * @param {string} key
 * @param {(string|false)} value
 * @param {string} defaultValue
 * @returns {Header}
 */
function makeHeaderObj(key, value, defaultValue) {
	if (value === false) {
		return undefined
	}

	return {
		key,
		value: value || defaultValue
	}
}

/**
 * @module @levers-inc/next-safe
 */

/**
 * @typedef {Object} Header
 * @property {string} key - The header name
 * @property {string} value - The header value
 */

/**
 * @typedef {Object} NextSafeConfig
 * @property {string} [contentTypeOptions]
 * @property {Object} [contentSecurityPolicy]
 * @property {string} [frameOptions]
 * @property {Object} [permissionsPolicy]
 * @property {boolean} [permissionsPolicyDirectiveSupport]
 * @property {boolean} [isDev]
 * @property {string} [referrerPolicy]
 * @property {string} [xssProtection]
 */

/**
 * Configures security headers for Next.js applications
 * @param {NextSafeConfig} [options] - Configuration options for security headers
 * @returns {Header[]} Array of security headers
 * @type {function(NextSafeConfig=): Header[]}
 */
function nextSafe(options = {}) {
	const {
		contentTypeOptions,
		contentSecurityPolicy = {},
		frameOptions,
		permissionsPolicy = {},
		permissionsPolicyDirectiveSupport,
		isDev = false,
		referrerPolicy,
		xssProtection,
	} = options

	return [
		...buildCSPHeaders({ contentSecurityPolicy, isDev }),
		...buildPermissionsPolicyHeaders({ permissionsPolicy, permissionsPolicyDirectiveSupport, isDev }),
		makeHeaderObj('Referrer-Policy', referrerPolicy, 'no-referrer'),
		makeHeaderObj('X-Content-Type-Options', contentTypeOptions, 'nosniff'),
		makeHeaderObj('X-Frame-Options', frameOptions, 'DENY'),
		makeHeaderObj('X-XSS-Protection', xssProtection, '1; mode=block'),
	].filter((header) => Boolean(header))
}

module.exports = nextSafe
