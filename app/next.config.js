/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  headers: async () => {
    return [
        {
            source: '/:slug*',
            headers: [
                {
                    key: 'Access-Control-Allow-Origin',
                    value: '*',
                },
                {
                    key: 'Access-Control-Allow-Headers',
                    value: 'Origin, X-Requested-With, Content-Type, Accept',
                },
            ],

        },

    ]
  },
}
