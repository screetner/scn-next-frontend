import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['thanapatsblobpocv2.blob.core.windows.net'],
  },
}

export default withNextIntl(nextConfig)
