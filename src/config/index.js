let config = {
  /* React router history backend */
  historyBackend: 'hashHistory',
  urlPrefix: '/',
};

/* Construct configs from environment */
if (process && typeof process.env.NODE_ENV !== 'undefined') {
  config = {...config, ...require(`./${process.env.NODE_ENV}`).default};
}

/* Freezed the config object, make it not able to be modified */
Object.freeze(config);

/* Export config */
export default config;
